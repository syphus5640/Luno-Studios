
import React, { useEffect, useState, useRef } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { Mic, Phone, Loader2, Volume2 } from 'lucide-react';

const retellWebClient = new RetellWebClient();

export const RetellDemo: React.FC = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [agentState, setAgentState] = useState<'idle' | 'listening' | 'speaking'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    // Listen to Retell events for UI updates
    retellWebClient.on('call_started', () => {
      console.log('Call started');
      setIsCalling(true);
      setIsInitializing(false);
      setAgentState('listening');
    });

    retellWebClient.on('call_ended', () => {
      console.log('Call ended');
      setIsCalling(false);
      setAgentState('idle');
    });

    retellWebClient.on('agent_start_talking', () => {
      setAgentState('speaking');
    });

    retellWebClient.on('agent_stop_talking', () => {
      setAgentState('listening');
    });

    retellWebClient.on('error', (error) => {
      console.error('Retell error:', error);
      setError('Connection failed. Please try again.');
      setIsCalling(false);
      setIsInitializing(false);
      retellWebClient.stopCall();
    });
    
    // Cleanup on unmount
    return () => {
      if (isCalling) {
        retellWebClient.stopCall();
      }
    };
  }, [isCalling]);

  const startCall = async () => {
    setError('');
    setIsInitializing(true);
    try {
      // 1. Get Access Token from our backend
      // Use relative path - handled by Vite proxy
      const response = await fetch(`/api/retell/create-web-call`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to get access token. Is the server running and configured?');
      }

      const data = await response.json();
      
      // 2. Start the call using the SDK
      await retellWebClient.startCall({
        accessToken: data.access_token,
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to start call');
      setIsInitializing(false);
    }
  };

  const stopCall = () => {
    retellWebClient.stopCall();
    setIsCalling(false);
    setAgentState('idle');
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-luno-dark border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden shadow-2xl">
      
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-luno-accent/10 rounded-full blur-3xl transition-all duration-700 ${isCalling ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`} />

      <h3 className="text-xl font-bold mb-2 relative z-10">Interactive Demo</h3>
      <p className="text-sm text-gray-400 mb-6 relative z-10 leading-snug">Talk to our AI demo right now, directly in your browser.</p>

      {/* Visualization Circle */}
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        {/* Ripple Rings */}
        {isCalling && (
          <>
            <div className={`absolute inset-0 rounded-full border border-luno-accent/30 ${agentState === 'speaking' ? 'animate-ping' : ''}`} />
            <div className={`absolute inset-2 rounded-full border border-luno-accent/30 ${agentState === 'speaking' ? 'animate-ping delay-100' : ''}`} />
          </>
        )}
        
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
          isCalling 
            ? agentState === 'speaking' ? 'bg-luno-accent shadow-[0_0_30px_rgba(255,212,59,0.6)] scale-110' : 'bg-luno-light shadow-[0_0_20px_rgba(26,31,75,0.8)]'
            : 'bg-white/5 border border-white/10'
        }`}>
          {isInitializing ? (
            <Loader2 className="animate-spin text-luno-accent" size={24} />
          ) : isCalling ? (
             agentState === 'speaking' ? <Volume2 className="text-luno-dark" size={24} /> : <Mic className="text-white" size={24} />
          ) : (
            <Mic className="text-gray-400" size={24} />
          )}
        </div>
      </div>

      {/* Status Text */}
      <div className="h-6 mb-4 relative z-10 text-sm">
        {isInitializing && <span className="text-luno-accent animate-pulse">Connecting...</span>}
        {isCalling && agentState === 'speaking' && <span className="text-luno-accent font-bold">AI is speaking...</span>}
        {isCalling && agentState === 'listening' && <span className="text-gray-300">Listening...</span>}
        {!isCalling && !isInitializing && !error && <span className="text-gray-500">Ready to start</span>}
        {error && <span className="text-red-400 text-xs">{error}</span>}
      </div>

      {/* Controls */}
      <div className="relative z-10">
        {!isCalling ? (
          <button 
            onClick={startCall}
            disabled={isInitializing}
            className="w-full py-3 rounded-full bg-luno-accent text-luno-dark font-bold text-sm hover:bg-white transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Phone size={18} fill="currentColor" />
            Start Free Demo
          </button>
        ) : (
          <button 
            onClick={stopCall}
            className="w-full py-3 rounded-full bg-red-500/20 text-red-400 border border-red-500/50 font-bold text-sm hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Phone size={18} className="rotate-[135deg]" />
            End Conversation
          </button>
        )}
        <p className="text-[10px] text-gray-600 mt-3">Microphone access required.</p>
      </div>
    </div>
  );
};
