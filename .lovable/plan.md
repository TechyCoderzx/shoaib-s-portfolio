# Hero Interaction and Dark-Mode Refinement

## Goal
Preserve the portfolio’s current structure and cosmic visual identity while making the existing hero constellation responsive to the pointer, removing theme switching, and styling only the large hero name with Brittany Signature.

## Changes
- Replace the hero image element with a focused Canvas-backed constellation component that keeps the current image visible and samples its luminous points for local cursor repulsion, spring return, restrained connecting lines, and subtle depth movement.
- Keep the canvas behind all hero copy and controls, use adaptive particle density, and reduce or disable motion when requested by the device.
- Remove the light/dark toggle, its state and browser storage logic, and the unused light-theme styling while retaining the existing dark palette unchanged.
- Load the Brittany Signature web font and apply it only to “Shoaib Junaid Khan,” with responsive sizing, slight spacing, and careful line height.

## Validation
- Verify desktop and mobile layouts, pointer response and recovery, readable name typography, working navigation/buttons, no overflow, no browser errors, and a successful build.
