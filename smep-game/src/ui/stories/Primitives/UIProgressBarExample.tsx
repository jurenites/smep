import React from 'react';
import { UIProgressBar } from '../../components/Primitives/UIProgressBar';
import { UISquareState } from '../../../lib/types';

/**
 * Example wrapper element demonstrating UIProgressBar usage
 * Container width is fixed at 31px as specified
 */
export function UIProgressBarExample() {
    return (
        <div style={{
            width: '31px', // Fixed 31px width as specified
            padding: '8px',
            border: '1px dashed #666',
            borderRadius: '4px',
            backgroundColor: '#f5f5f5'
        }}>
            <UIProgressBar
                state={UISquareState.ACTIVE}
                logicalSize="mid"
                progress={0.75}
                fillColor="#FFFFFF"
            />
        </div>
    );
}
