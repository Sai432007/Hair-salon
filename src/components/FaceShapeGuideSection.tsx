import React, { useState } from 'react';
import { faceShapeGuides } from '../data/barberData';
import { CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';

export const FaceShapeGuideSection: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<string>(faceShapeGuides[0].shape);

  const activeGuide =
    faceShapeGuides.find((g) => g.shape === selectedShape) || faceShapeGuides[0];

  return (
    <section id="style-guide" className="bg-[#121318] py-20 border-b border-[#20222a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#c99b4d] font-semibold">
            Bespoke Consultation Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f5f8] font-normal">
            Match Your Haircut to Your Face Shape
          </h2>
          <p className="text-sm sm:text-base text-[#9297a5]">
            A great haircut doesn't live in a vacuum—it compensates for jaw angles, forehead width, and cheekbone prominence. Select your shape below:
          </p>
        </div>

        {/* Shape Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {faceShapeGuides.map((guide) => (
            <button
              key={guide.shape}
              onClick={() => setSelectedShape(guide.shape)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                selectedShape === guide.shape
                  ? 'bg-[#c99b4d] text-[#0e0f12] shadow-md shadow-[#c99b4d]/10'
                  : 'bg-[#181a22] text-[#9ba0ad] border border-[#262934] hover:text-white hover:border-[#3d4252]'
              }`}
            >
              {guide.shape}
            </button>
          ))}
        </div>

        {/* Selected Shape Detail Card */}
        <div className="rounded-sm border border-[#262832] bg-[#15171e] p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#21232d] pb-4 mb-6">
            <div>
              <h3 className="font-serif text-2xl text-[#f2f4f7] font-medium">
                {activeGuide.shape} Profile
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#c99b4d] mt-0.5">
                {activeGuide.tagline}
              </p>
            </div>
            <div className="text-xs text-[#808593] flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-[#c99b4d]" />
              <span>Unsure? Your barber checks this during chair consultation</span>
            </div>
          </div>

          <p className="text-sm text-[#b2b7c4] leading-relaxed mb-8">
            {activeGuide.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Recommended */}
            <div className="rounded-xs bg-[#111216] border border-[#1e2027] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
                <CheckCircle2 className="h-4 w-4" />
                <span>Recommended Haircuts</span>
              </div>
              <ul className="space-y-2">
                {activeGuide.recommendedCuts.map((cut, idx) => (
                  <li key={idx} className="text-xs text-[#c4c7cf] flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
                    <span>{cut}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Avoid */}
            <div className="rounded-xs bg-[#111216] border border-[#1e2027] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-3">
                <XCircle className="h-4 w-4" />
                <span>Silhouettes to Avoid</span>
              </div>
              <ul className="space-y-2">
                {activeGuide.avoidCuts.map((cut, idx) => (
                  <li key={idx} className="text-xs text-[#a4a9b7] flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500/70" />
                    <span>{cut}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Styling Product Tip */}
          <div className="flex items-center gap-3 rounded-xs bg-[#1c1f28] border border-[#2a2d39] p-4 text-xs text-[#b8bdca]">
            <Sparkles className="h-5 w-5 text-[#c99b4d] shrink-0" />
            <div>
              <span className="font-semibold text-[#e4cfa3]">Styling Arsenal Recommendation: </span>
              <span>{activeGuide.bestProduct}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
