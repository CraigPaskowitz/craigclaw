/* global React */
const { useState } = React;

function CCTweaks({ tweaks, setTweaks }) {
  const T = window.TweaksPanel;
  const S = window.TweakSection;
  const Sel = window.TweakSelect;
  const Rad = window.TweakRadio;
  if (!T) return null;
  const set = (k, v) => setTweaks({ ...tweaks, [k]: v });
  return (
    <T title="Tweaks">
      <S title="Theme">
        <Rad
          label="Mode"
          value={tweaks.theme}
          onChange={(v) => set("theme", v)}
          options={[
            { label: "Ops dark", value: "ops" },
            { label: "Paper", value: "paper" },
          ]}
        />
      </S>
      <S title="Density">
        <Rad
          label="Reading density"
          value={tweaks.density}
          onChange={(v) => set("density", v)}
          options={[
            { label: "Compact", value: "compact" },
            { label: "Standard", value: "standard" },
            { label: "Editorial", value: "editorial" },
          ]}
        />
      </S>
    </T>
  );
}

window.CCTweaks = CCTweaks;
