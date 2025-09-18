// Periodic Table Position Mapper - Calculates position based on atomicNumber
// This provides a simple correlation between atomicNumber and x,y coordinates

export interface Position {
    x: number;
    y: number;
}

// Position mapping for Long Form (standard periodic table)
export const getLongFormPosition = (atomicNumber: number): Position => {
    // S-block elements (Groups 1-2)
    if (atomicNumber === 1) return { x: 0, y: 0 }; // H
    if (atomicNumber === 2) return { x: 31, y: 0 }; // He
    if (atomicNumber === 3) return { x: 0, y: 1 }; // Li
    if (atomicNumber === 4) return { x: 1, y: 1 }; // Be
    if (atomicNumber === 11) return { x: 0, y: 2 }; // Na
    if (atomicNumber === 12) return { x: 1, y: 2 }; // Mg
    if (atomicNumber === 19) return { x: 0, y: 3 }; // K
    if (atomicNumber === 20) return { x: 1, y: 3 }; // Ca
    if (atomicNumber === 37) return { x: 0, y: 4 }; // Rb
    if (atomicNumber === 38) return { x: 1, y: 4 }; // Sr
    if (atomicNumber === 55) return { x: 0, y: 5 }; // Cs
    if (atomicNumber === 56) return { x: 1, y: 5 }; // Ba
    if (atomicNumber === 87) return { x: 0, y: 6 }; // Fr
    if (atomicNumber === 88) return { x: 1, y: 6 }; // Ra

    // F-block elements (Lanthanides and Actinides)
    // Lanthanides (Period 6)
    if (atomicNumber === 57) return { x: 2, y: 5 }; // La
    if (atomicNumber === 58) return { x: 2, y: 6 }; // Ce
    if (atomicNumber === 59) return { x: 3, y: 6 }; // Pr
    if (atomicNumber === 60) return { x: 4, y: 6 }; // Nd
    if (atomicNumber === 61) return { x: 5, y: 6 }; // Pm
    if (atomicNumber === 62) return { x: 6, y: 6 }; // Sm
    if (atomicNumber === 63) return { x: 7, y: 6 }; // Eu
    if (atomicNumber === 64) return { x: 8, y: 6 }; // Gd
    if (atomicNumber === 65) return { x: 9, y: 6 }; // Tb
    if (atomicNumber === 66) return { x: 10, y: 6 }; // Dy
    if (atomicNumber === 67) return { x: 11, y: 6 }; // Ho
    if (atomicNumber === 68) return { x: 12, y: 6 }; // Er
    if (atomicNumber === 69) return { x: 13, y: 6 }; // Tm
    if (atomicNumber === 70) return { x: 14, y: 6 }; // Yb
    if (atomicNumber === 71) return { x: 15, y: 6 }; // Lu

    // Actinides (Period 7)
    if (atomicNumber === 89) return { x: 2, y: 7 }; // Ac
    if (atomicNumber === 90) return { x: 2, y: 8 }; // Th
    if (atomicNumber === 91) return { x: 3, y: 8 }; // Pa
    if (atomicNumber === 92) return { x: 4, y: 8 }; // U
    if (atomicNumber === 93) return { x: 5, y: 8 }; // Np
    if (atomicNumber === 94) return { x: 6, y: 8 }; // Pu
    if (atomicNumber === 95) return { x: 7, y: 8 }; // Am
    if (atomicNumber === 96) return { x: 8, y: 8 }; // Cm
    if (atomicNumber === 97) return { x: 9, y: 8 }; // Bk
    if (atomicNumber === 98) return { x: 10, y: 8 }; // Cf
    if (atomicNumber === 99) return { x: 11, y: 8 }; // Es
    if (atomicNumber === 100) return { x: 12, y: 8 }; // Fm
    if (atomicNumber === 101) return { x: 13, y: 8 }; // Md
    if (atomicNumber === 102) return { x: 14, y: 8 }; // No
    if (atomicNumber === 103) return { x: 15, y: 8 }; // Lr

    // D-block elements (Transition metals)
    // Period 4
    if (atomicNumber === 21) return { x: 18, y: 3 }; // Sc
    if (atomicNumber === 22) return { x: 19, y: 3 }; // Ti
    if (atomicNumber === 23) return { x: 20, y: 3 }; // V
    if (atomicNumber === 24) return { x: 21, y: 3 }; // Cr
    if (atomicNumber === 25) return { x: 22, y: 3 }; // Mn
    if (atomicNumber === 26) return { x: 23, y: 3 }; // Fe
    if (atomicNumber === 27) return { x: 24, y: 3 }; // Co
    if (atomicNumber === 28) return { x: 25, y: 3 }; // Ni
    if (atomicNumber === 29) return { x: 26, y: 3 }; // Cu
    if (atomicNumber === 30) return { x: 27, y: 3 }; // Zn

    // Period 5
    if (atomicNumber === 39) return { x: 18, y: 4 }; // Y
    if (atomicNumber === 40) return { x: 19, y: 4 }; // Zr
    if (atomicNumber === 41) return { x: 20, y: 4 }; // Nb
    if (atomicNumber === 42) return { x: 21, y: 4 }; // Mo
    if (atomicNumber === 43) return { x: 22, y: 4 }; // Tc
    if (atomicNumber === 44) return { x: 23, y: 4 }; // Ru
    if (atomicNumber === 45) return { x: 24, y: 4 }; // Rh
    if (atomicNumber === 46) return { x: 25, y: 4 }; // Pd
    if (atomicNumber === 47) return { x: 26, y: 4 }; // Ag
    if (atomicNumber === 48) return { x: 27, y: 4 }; // Cd

    // Period 6 (connected to F-block)
    if (atomicNumber === 72) return { x: 19, y: 5 }; // Hf
    if (atomicNumber === 73) return { x: 20, y: 5 }; // Ta
    if (atomicNumber === 74) return { x: 21, y: 5 }; // W
    if (atomicNumber === 75) return { x: 22, y: 5 }; // Re
    if (atomicNumber === 76) return { x: 23, y: 5 }; // Os
    if (atomicNumber === 77) return { x: 24, y: 5 }; // Ir
    if (atomicNumber === 78) return { x: 25, y: 5 }; // Pt
    if (atomicNumber === 79) return { x: 26, y: 5 }; // Au
    if (atomicNumber === 80) return { x: 27, y: 5 }; // Hg

    // Period 7 (connected to F-block)
    if (atomicNumber === 104) return { x: 19, y: 7 }; // Rf
    if (atomicNumber === 105) return { x: 20, y: 7 }; // Db
    if (atomicNumber === 106) return { x: 21, y: 7 }; // Sg
    if (atomicNumber === 107) return { x: 22, y: 7 }; // Bh
    if (atomicNumber === 108) return { x: 23, y: 7 }; // Hs
    if (atomicNumber === 109) return { x: 24, y: 7 }; // Mt
    if (atomicNumber === 110) return { x: 25, y: 7 }; // Ds
    if (atomicNumber === 111) return { x: 26, y: 7 }; // Rg
    if (atomicNumber === 112) return { x: 27, y: 7 }; // Cn

    // P-block elements (Groups 13-18)
    // Period 2
    if (atomicNumber === 5) return { x: 28, y: 1 }; // B
    if (atomicNumber === 6) return { x: 29, y: 1 }; // C
    if (atomicNumber === 7) return { x: 30, y: 1 }; // N
    if (atomicNumber === 8) return { x: 31, y: 1 }; // O
    if (atomicNumber === 9) return { x: 32, y: 1 }; // F
    if (atomicNumber === 10) return { x: 33, y: 1 }; // Ne

    // Period 3
    if (atomicNumber === 13) return { x: 28, y: 2 }; // Al
    if (atomicNumber === 14) return { x: 29, y: 2 }; // Si
    if (atomicNumber === 15) return { x: 30, y: 2 }; // P
    if (atomicNumber === 16) return { x: 31, y: 2 }; // S
    if (atomicNumber === 17) return { x: 32, y: 2 }; // Cl
    if (atomicNumber === 18) return { x: 33, y: 2 }; // Ar

    // Period 4
    if (atomicNumber === 31) return { x: 28, y: 3 }; // Ga
    if (atomicNumber === 32) return { x: 29, y: 3 }; // Ge
    if (atomicNumber === 33) return { x: 30, y: 3 }; // As
    if (atomicNumber === 34) return { x: 31, y: 3 }; // Se
    if (atomicNumber === 35) return { x: 32, y: 3 }; // Br
    if (atomicNumber === 36) return { x: 33, y: 3 }; // Kr

    // Period 5
    if (atomicNumber === 49) return { x: 28, y: 4 }; // In
    if (atomicNumber === 50) return { x: 29, y: 4 }; // Sn
    if (atomicNumber === 51) return { x: 30, y: 4 }; // Sb
    if (atomicNumber === 52) return { x: 31, y: 4 }; // Te
    if (atomicNumber === 53) return { x: 32, y: 4 }; // I
    if (atomicNumber === 54) return { x: 33, y: 4 }; // Xe

    // Period 6
    if (atomicNumber === 81) return { x: 28, y: 5 }; // Tl
    if (atomicNumber === 82) return { x: 29, y: 5 }; // Pb
    if (atomicNumber === 83) return { x: 30, y: 5 }; // Bi
    if (atomicNumber === 84) return { x: 31, y: 5 }; // Po
    if (atomicNumber === 85) return { x: 32, y: 5 }; // At
    if (atomicNumber === 86) return { x: 33, y: 5 }; // Rn

    // Period 7
    if (atomicNumber === 113) return { x: 28, y: 6 }; // Nh
    if (atomicNumber === 114) return { x: 29, y: 6 }; // Fl
    if (atomicNumber === 115) return { x: 30, y: 6 }; // Mc
    if (atomicNumber === 116) return { x: 31, y: 6 }; // Lv
    if (atomicNumber === 117) return { x: 32, y: 6 }; // Ts
    if (atomicNumber === 118) return { x: 33, y: 6 }; // Og

    // Default fallback
    return { x: 0, y: 0 };
};

// Position mapping for Short Form (F-block moved under the table)
export const getShortFormPosition = (atomicNumber: number): Position => {
    // S-block elements (keep original positions)
    if (atomicNumber === 1) return { x: 0, y: 0 }; // H
    if (atomicNumber === 2) return { x: 17, y: 0 }; // He (moved to fit in 18 columns)
    if (atomicNumber === 3) return { x: 0, y: 1 }; // Li
    if (atomicNumber === 4) return { x: 1, y: 1 }; // Be
    if (atomicNumber === 11) return { x: 0, y: 2 }; // Na
    if (atomicNumber === 12) return { x: 1, y: 2 }; // Mg
    if (atomicNumber === 19) return { x: 0, y: 3 }; // K
    if (atomicNumber === 20) return { x: 1, y: 3 }; // Ca
    if (atomicNumber === 37) return { x: 0, y: 4 }; // Rb
    if (atomicNumber === 38) return { x: 1, y: 4 }; // Sr
    if (atomicNumber === 55) return { x: 0, y: 5 }; // Cs
    if (atomicNumber === 56) return { x: 1, y: 5 }; // Ba
    if (atomicNumber === 87) return { x: 0, y: 6 }; // Fr
    if (atomicNumber === 88) return { x: 1, y: 6 }; // Ra

    // D-block elements (repositioned to columns 2-11)
    // Period 4
    if (atomicNumber === 21) return { x: 2, y: 3 }; // Sc
    if (atomicNumber === 22) return { x: 3, y: 3 }; // Ti
    if (atomicNumber === 23) return { x: 4, y: 3 }; // V
    if (atomicNumber === 24) return { x: 5, y: 3 }; // Cr
    if (atomicNumber === 25) return { x: 6, y: 3 }; // Mn
    if (atomicNumber === 26) return { x: 7, y: 3 }; // Fe
    if (atomicNumber === 27) return { x: 8, y: 3 }; // Co
    if (atomicNumber === 28) return { x: 9, y: 3 }; // Ni
    if (atomicNumber === 29) return { x: 10, y: 3 }; // Cu
    if (atomicNumber === 30) return { x: 11, y: 3 }; // Zn

    // Period 5
    if (atomicNumber === 39) return { x: 2, y: 4 }; // Y
    if (atomicNumber === 40) return { x: 3, y: 4 }; // Zr
    if (atomicNumber === 41) return { x: 4, y: 4 }; // Nb
    if (atomicNumber === 42) return { x: 5, y: 4 }; // Mo
    if (atomicNumber === 43) return { x: 6, y: 4 }; // Tc
    if (atomicNumber === 44) return { x: 7, y: 4 }; // Ru
    if (atomicNumber === 45) return { x: 8, y: 4 }; // Rh
    if (atomicNumber === 46) return { x: 9, y: 4 }; // Pd
    if (atomicNumber === 47) return { x: 10, y: 4 }; // Ag
    if (atomicNumber === 48) return { x: 11, y: 4 }; // Cd

    // Period 6
    if (atomicNumber === 72) return { x: 3, y: 5 }; // Hf
    if (atomicNumber === 73) return { x: 4, y: 5 }; // Ta
    if (atomicNumber === 74) return { x: 5, y: 5 }; // W
    if (atomicNumber === 75) return { x: 6, y: 5 }; // Re
    if (atomicNumber === 76) return { x: 7, y: 5 }; // Os
    if (atomicNumber === 77) return { x: 8, y: 5 }; // Ir
    if (atomicNumber === 78) return { x: 9, y: 5 }; // Pt
    if (atomicNumber === 79) return { x: 10, y: 5 }; // Au
    if (atomicNumber === 80) return { x: 11, y: 5 }; // Hg

    // Period 7
    if (atomicNumber === 104) return { x: 3, y: 7 }; // Rf
    if (atomicNumber === 105) return { x: 4, y: 7 }; // Db
    if (atomicNumber === 106) return { x: 5, y: 7 }; // Sg
    if (atomicNumber === 107) return { x: 6, y: 7 }; // Bh
    if (atomicNumber === 108) return { x: 7, y: 7 }; // Hs
    if (atomicNumber === 109) return { x: 8, y: 7 }; // Mt
    if (atomicNumber === 110) return { x: 9, y: 7 }; // Ds
    if (atomicNumber === 111) return { x: 10, y: 7 }; // Rg
    if (atomicNumber === 112) return { x: 11, y: 7 }; // Cn

    // P-block elements (repositioned to columns 12-17)
    // Period 2
    if (atomicNumber === 5) return { x: 12, y: 1 }; // B
    if (atomicNumber === 6) return { x: 13, y: 1 }; // C
    if (atomicNumber === 7) return { x: 14, y: 1 }; // N
    if (atomicNumber === 8) return { x: 15, y: 1 }; // O
    if (atomicNumber === 9) return { x: 16, y: 1 }; // F
    if (atomicNumber === 10) return { x: 17, y: 1 }; // Ne

    // Period 3
    if (atomicNumber === 13) return { x: 12, y: 2 }; // Al
    if (atomicNumber === 14) return { x: 13, y: 2 }; // Si
    if (atomicNumber === 15) return { x: 14, y: 2 }; // P
    if (atomicNumber === 16) return { x: 15, y: 2 }; // S
    if (atomicNumber === 17) return { x: 16, y: 2 }; // Cl
    if (atomicNumber === 18) return { x: 17, y: 2 }; // Ar

    // Period 4
    if (atomicNumber === 31) return { x: 12, y: 3 }; // Ga
    if (atomicNumber === 32) return { x: 13, y: 3 }; // Ge
    if (atomicNumber === 33) return { x: 14, y: 3 }; // As
    if (atomicNumber === 34) return { x: 15, y: 3 }; // Se
    if (atomicNumber === 35) return { x: 16, y: 3 }; // Br
    if (atomicNumber === 36) return { x: 17, y: 3 }; // Kr

    // Period 5
    if (atomicNumber === 49) return { x: 12, y: 4 }; // In
    if (atomicNumber === 50) return { x: 13, y: 4 }; // Sn
    if (atomicNumber === 51) return { x: 14, y: 4 }; // Sb
    if (atomicNumber === 52) return { x: 15, y: 4 }; // Te
    if (atomicNumber === 53) return { x: 16, y: 4 }; // I
    if (atomicNumber === 54) return { x: 17, y: 4 }; // Xe

    // Period 6
    if (atomicNumber === 81) return { x: 12, y: 5 }; // Tl
    if (atomicNumber === 82) return { x: 13, y: 5 }; // Pb
    if (atomicNumber === 83) return { x: 14, y: 5 }; // Bi
    if (atomicNumber === 84) return { x: 15, y: 5 }; // Po
    if (atomicNumber === 85) return { x: 16, y: 5 }; // At
    if (atomicNumber === 86) return { x: 17, y: 5 }; // Rn

    // Period 7
    if (atomicNumber === 113) return { x: 12, y: 6 }; // Nh
    if (atomicNumber === 114) return { x: 13, y: 6 }; // Fl
    if (atomicNumber === 115) return { x: 14, y: 6 }; // Mc
    if (atomicNumber === 116) return { x: 15, y: 6 }; // Lv
    if (atomicNumber === 117) return { x: 16, y: 6 }; // Ts
    if (atomicNumber === 118) return { x: 17, y: 6 }; // Og

    // F-block elements (moved to rows 8-9 with left indent)
    // Lanthanides (Period 6)
    if (atomicNumber === 57) return { x: 2, y: 8 }; // La
    if (atomicNumber === 58) return { x: 3, y: 8 }; // Ce
    if (atomicNumber === 59) return { x: 4, y: 8 }; // Pr
    if (atomicNumber === 60) return { x: 5, y: 8 }; // Nd
    if (atomicNumber === 61) return { x: 6, y: 8 }; // Pm
    if (atomicNumber === 62) return { x: 7, y: 8 }; // Sm
    if (atomicNumber === 63) return { x: 8, y: 8 }; // Eu
    if (atomicNumber === 64) return { x: 9, y: 8 }; // Gd
    if (atomicNumber === 65) return { x: 10, y: 8 }; // Tb
    if (atomicNumber === 66) return { x: 11, y: 8 }; // Dy
    if (atomicNumber === 67) return { x: 12, y: 8 }; // Ho
    if (atomicNumber === 68) return { x: 13, y: 8 }; // Er
    if (atomicNumber === 69) return { x: 14, y: 8 }; // Tm
    if (atomicNumber === 70) return { x: 15, y: 8 }; // Yb
    if (atomicNumber === 71) return { x: 16, y: 8 }; // Lu

    // Actinides (Period 7)
    if (atomicNumber === 89) return { x: 2, y: 9 }; // Ac
    if (atomicNumber === 90) return { x: 3, y: 9 }; // Th
    if (atomicNumber === 91) return { x: 4, y: 9 }; // Pa
    if (atomicNumber === 92) return { x: 5, y: 9 }; // U
    if (atomicNumber === 93) return { x: 6, y: 9 }; // Np
    if (atomicNumber === 94) return { x: 7, y: 9 }; // Pu
    if (atomicNumber === 95) return { x: 8, y: 9 }; // Am
    if (atomicNumber === 96) return { x: 9, y: 9 }; // Cm
    if (atomicNumber === 97) return { x: 10, y: 9 }; // Bk
    if (atomicNumber === 98) return { x: 11, y: 9 }; // Cf
    if (atomicNumber === 99) return { x: 12, y: 9 }; // Es
    if (atomicNumber === 100) return { x: 13, y: 9 }; // Fm
    if (atomicNumber === 101) return { x: 14, y: 9 }; // Md
    if (atomicNumber === 102) return { x: 15, y: 9 }; // No
    if (atomicNumber === 103) return { x: 16, y: 9 }; // Lr

    // Default fallback
    return { x: 0, y: 0 };
};

// Main function to get position based on view mode
export const getElementPosition = (atomicNumber: number, viewMode: 'long' | 'short'): Position => {
    return viewMode === 'long' ? getLongFormPosition(atomicNumber) : getShortFormPosition(atomicNumber);
};
