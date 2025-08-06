import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import socket from '../socket';

const Editor = ({ roomId, code, onCodeChange }) => {
    
    const handleChange = (value) => {
        onCodeChange(value);
        socket.emit('code-change', {
            roomId,
            code: value,
        });
    };

    return (
        <div className="absolute inset-0 overflow-y-auto">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
                <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M85 25C85 16.7157 78.2843 10 70 10H30C18.9543 10 10 18.9543 10 30V70C10 81.0457 18.9543 90 30 90H70C78.2843 90 85 83.2843 85 75" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round"/>
                </svg>
            </div>

            <div className="relative z-10">
                <CodeMirror
                    value={code}
                    height="auto"
                    minHeight="100vh" 
                    extensions={[
                        vscodeDark,
                        javascript({ jsx: true }),
                        EditorView.theme({
                            '&': {
                                backgroundColor: 'transparent !important',
                                fontSize: '14px',
                            },
                            '.cm-content': {
                                caretColor: '#fff',
                            },
                            '.cm-gutters': {
                                backgroundColor: 'transparent !important',
                                border: 'none',
                            },
                        }),
                    ]}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default Editor;