import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UIUpgradeItemLine } from '../../components/Upgrades/UIUpgradeItemLine';
import { UIUpgradeItemLineSkeleton } from '../../components/Upgrades/UIUpgradeItemLineSkeleton';
import { UISkeletonLoader } from '../../components/Loading/UISkeletonLoader';
import { UPGRADE_DATA } from '../../../lib/data/upgrade.data';

const meta: Meta = {
    title: 'Screens/UpgradeScreen',
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'dark', value: '#000000' },
                { name: 'light', value: '#FFFFFF' },
            ],
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Upgrade Screen Loading Demo
export const UpgradeScreenLoadingDemo: Story = {
    render: () => {
        const [isLoading, setIsLoading] = useState(true);
        const [selectedUpgrade, setSelectedUpgrade] = useState<number | null>(null);

        // Simulate data loading with 2-second delay
        useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000);

            return () => clearTimeout(timer);
        }, []);

        // Calculate stagger delays for 10 items
        const MAX_SCREEN_LOAD = 0.5; // seconds
        const REVEAL_DURATION = 0.3; // slow animation
        const NUM_ITEMS = 10;
        const staggerDelay = (MAX_SCREEN_LOAD - REVEAL_DURATION) / NUM_ITEMS; // 0.02s

        // Get first 10 upgrades for demo
        const demoUpgrades = UPGRADE_DATA.slice(0, 10);

        const handleUpgradeSelect = (index: number) => {
            setSelectedUpgrade(selectedUpgrade === index ? null : index);
        };

        const handleUpgradeResearch = (index: number) => {
            console.log(`Research started for upgrade ${index}`);
        };

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--size-gap-small)',
                width: '320px',
                padding: '16px',
                backgroundColor: '#000000',
                minHeight: '600px'
            }}>
                <div style={{
                    color: '#FFFFF5',
                    marginBottom: '8px',
                    fontFamily: 'Roundabout-Regular, Urbanist, sans-serif',
                    fontSize: '16px'
                }}>
                    Upgrade Research Center
                </div>

                {demoUpgrades.map((upgrade, index) => (
                    <UISkeletonLoader
                        key={upgrade.id}
                        isLoading={isLoading}
                        skeleton={
                            <UIUpgradeItemLineSkeleton
                                viewMode="full"
                                width={320}
                            />
                        }
                        animationDuration="slow"
                        staggerDelay={index * staggerDelay}
                        showReadyFlash={true}
                    >
                        <UIUpgradeItemLine
                            upgrade={upgrade}
                            viewMode="full"
                            itemState={selectedUpgrade === index ? 'selected' : 'available'}
                            upgradeState="not-started"
                            isAffordable={true}
                            gainingIfResearched={10.5 + index * 5}
                            onSelect={() => handleUpgradeSelect(index)}
                            onResearch={() => handleUpgradeResearch(index)}
                        />
                    </UISkeletonLoader>
                ))}
            </div>
        );
    },
};

// Upgrade Screen Loading Demo - Mid Mode
export const UpgradeScreenLoadingDemoMid: Story = {
    render: () => {
        const [isLoading, setIsLoading] = useState(true);
        const [selectedUpgrade, setSelectedUpgrade] = useState<number | null>(null);

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000);

            return () => clearTimeout(timer);
        }, []);

        const MAX_SCREEN_LOAD = 0.5;
        const REVEAL_DURATION = 0.3;
        const NUM_ITEMS = 10;
        const staggerDelay = (MAX_SCREEN_LOAD - REVEAL_DURATION) / NUM_ITEMS;

        const demoUpgrades = UPGRADE_DATA.slice(0, 10);

        const handleUpgradeSelect = (index: number) => {
            setSelectedUpgrade(selectedUpgrade === index ? null : index);
        };

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--size-gap-small)',
                width: '320px',
                padding: '16px',
                backgroundColor: '#000000',
                minHeight: '500px'
            }}>
                <div style={{
                    color: '#FFFFF5',
                    marginBottom: '8px',
                    fontFamily: 'Roundabout-Regular, Urbanist, sans-serif',
                    fontSize: '16px'
                }}>
                    Upgrade Research Center (Mid Mode)
                </div>

                {demoUpgrades.map((upgrade, index) => (
                    <UISkeletonLoader
                        key={upgrade.id}
                        isLoading={isLoading}
                        skeleton={
                            <UIUpgradeItemLineSkeleton
                                viewMode="mid"
                                width={320}
                            />
                        }
                        animationDuration="fast"
                        staggerDelay={index * staggerDelay}
                        showReadyFlash={false}
                    >
                        <UIUpgradeItemLine
                            upgrade={upgrade}
                            viewMode="mid"
                            itemState={selectedUpgrade === index ? 'selected' : 'available'}
                            upgradeState="not-started"
                            isAffordable={true}
                            gainingIfResearched={10.5 + index * 5}
                            onSelect={() => handleUpgradeSelect(index)}
                        />
                    </UISkeletonLoader>
                ))}
            </div>
        );
    },
};

// Upgrade Screen Loading Demo - Brief Mode
export const UpgradeScreenLoadingDemoBrief: Story = {
    render: () => {
        const [isLoading, setIsLoading] = useState(true);
        const [selectedUpgrade, setSelectedUpgrade] = useState<number | null>(null);

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000);

            return () => clearTimeout(timer);
        }, []);

        const MAX_SCREEN_LOAD = 0.5;
        const REVEAL_DURATION = 0.1; // fast animation for brief mode
        const NUM_ITEMS = 10;
        const staggerDelay = (MAX_SCREEN_LOAD - REVEAL_DURATION) / NUM_ITEMS;

        const demoUpgrades = UPGRADE_DATA.slice(0, 10);

        const handleUpgradeSelect = (index: number) => {
            setSelectedUpgrade(selectedUpgrade === index ? null : index);
        };

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--size-gap-small)',
                width: '320px',
                padding: '16px',
                backgroundColor: '#000000',
                minHeight: '500px'
            }}>
                <div style={{
                    color: '#FFFFF5',
                    marginBottom: '8px',
                    fontFamily: 'Roundabout-Regular, Urbanist, sans-serif',
                    fontSize: '16px'
                }}>
                    Upgrade Research Center (Brief Mode)
                </div>

                {demoUpgrades.map((upgrade, index) => (
                    <UISkeletonLoader
                        key={upgrade.id}
                        isLoading={isLoading}
                        skeleton={
                            <UIUpgradeItemLineSkeleton
                                viewMode="brief"
                                width={320}
                            />
                        }
                        animationDuration="immediate"
                        staggerDelay={index * staggerDelay}
                        showReadyFlash={false}
                    >
                        <UIUpgradeItemLine
                            upgrade={upgrade}
                            viewMode="brief"
                            itemState={selectedUpgrade === index ? 'selected' : 'available'}
                            upgradeState="not-started"
                            isAffordable={true}
                            gainingIfResearched={10.5 + index * 5}
                            onSelect={() => handleUpgradeSelect(index)}
                        />
                    </UISkeletonLoader>
                ))}
            </div>
        );
    },
};
