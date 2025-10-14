import React from 'react';
import { UISkeletonRectangle } from '../Loading/UISkeletonRectangle';
import { TOKENS } from '../../tokens/tokens';
import type { ViewMode } from './UIUpgradeItemLine';

export interface UIUpgradeItemLineSkeletonProps {
    /** View mode to match the real component dimensions */
    viewMode?: ViewMode;
    /** Width of the skeleton (default: 320px for typical lists) */
    width?: number;
    /** Optional CSS class name */
    className?: string;
}

export function UIUpgradeItemLineSkeleton({
    viewMode = 'full',
    width = 320,
    className = ''
}: UIUpgradeItemLineSkeletonProps) {
    const getHeight = (mode: ViewMode): number => {
        switch (mode) {
            case 'full':
                return TOKENS.sizes.UPGRADE_ITEM_FULL;
            case 'mid':
                return TOKENS.sizes.UPGRADE_ITEM_MID;
            case 'brief':
                return TOKENS.sizes.UPGRADE_ITEM_BRIEF;
            default:
                return TOKENS.sizes.UPGRADE_ITEM_FULL;
        }
    };

    return (
        <UISkeletonRectangle
            width={width}
            height={getHeight(viewMode)}
            className={className}
        />
    );
}
