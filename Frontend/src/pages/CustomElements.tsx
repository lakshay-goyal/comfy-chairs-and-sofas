import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type ColorOption = {
  id: string;
  name: string;
  hexCode: string;
};

type MaterialOption = {
  id: string;
  name: string;
  image: string;
};

type ChairTypeOption = {
  id: string;
  name: string;
  image: string;
  features: string[];
};

type LeatherType = {
  id: string;
  name: string;
  texture: string;
};

type BaseDesign = {
  id: string;
  name: string;
  image: string;
};

type WheelDesign = {
  id: string;
  name: string;
  image: string;
};

type ArmrestOption = {
  id: string;
  name: string;
  material: string;
};

// Mock Data
const chairTypes: ChairTypeOption[] = [
  { 
    id: '1', 
    name: 'Net Chair', 
    image: 'https://imgs.search.brave.com/lKzgP7GYHa3QJI7BbTW3pgdQ5rrlO9XIuNv5qg9sQBE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ib3Jp/bmdjb2xsZWN0aW9u/LmNvbS9jZG4vc2hv/cC9maWxlcy9Cb3Jp/bmctQ29sbGVjdGlv/bi1OZXR3ZWF2ZS1j/aGFpci5qcGc_dj0x/NzMyMjAxMjU0Jndp/ZHRoPTE5NDY',
    features: ['Mesh Type', 'Frame Color']
  },
  { 
    id: '2', 
    name: 'Boss Chair', 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    features: ['Leather Type', 'Stitching Color']
  },
  { 
    id: '3', 
    name: 'Gaming Chair', 
    image: 'https://imgs.search.brave.com/T_8GpETAYyROdMmtFC2XucgoFJ9MG_z1W9ik18BtTgg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9leHBlcmllbmNl/LXRydWUtY29tZm9y/dC1oaWdocGVyZm9y/bWFuY2UtZ2FtaW5n/LWNoYWlyLWdhbWVy/c184ODQ2MzAtOTg4/Ny5qcGc_c2VtdD1h/aXNfaHlicmlk',
    features: ['Lumbar Support', 'Headrest Style']
  }
];

const colorOptions: ColorOption[] = [
  { id: '1', name: 'Black', hexCode: '#000000' },
  { id: '2', name: 'Red', hexCode: '#FF0000' },
  { id: '3', name: 'Royal Blue', hexCode: '#4169E1' }
];

const leatherTypes: LeatherType[] = [
  { id: '1', name: 'Full Grain', texture: 'https://example.com/full-grain.jpg' },
  { id: '2', name: 'Top Grain', texture: 'https://example.com/top-grain.jpg' },
  { id: '3', name: 'Bonded', texture: 'https://example.com/bonded.jpg' }
];

const baseDesigns: BaseDesign[] = [
  { id: '1', name: 'Classic Static', image: 'https://example.com/static-base.jpg' },
  { id: '2', name: 'Modern Static', image: 'https://example.com/modern-static.jpg' }
];

const wheelDesigns: WheelDesign[] = [
  { id: '1', name: 'Standard Wheels', image: 'https://example.com/standard-wheels.jpg' },
  { id: '2', name: 'Premium Casters', image: 'https://example.com/premium-casters.jpg' }
];

const armrestOptions: ArmrestOption[] = [
  { id: '1', name: 'Padded', material: 'Memory Foam' },
  { id: '2', name: 'Wooden', material: 'Oak Wood' },
  { id: '3', name: 'Metallic', material: 'Brushed Aluminum' }
];

const CustomDesign = () => {
  const [selectedChairType, setSelectedChairType] = useState<ChairTypeOption>(chairTypes[0]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colorOptions[0]);
  const [selectedLeather, setSelectedLeather] = useState<LeatherType>(leatherTypes[0]);
  const [baseType, setBaseType] = useState<'static' | 'dynamic'>('static');
  const [selectedBase, setSelectedBase] = useState<BaseDesign>(baseDesigns[0]);
  const [selectedWheels, setSelectedWheels] = useState<WheelDesign>(wheelDesigns[0]);
  const [selectedArmrest, setSelectedArmrest] = useState<ArmrestOption>(armrestOptions[0]);

  const previewImage = selectedChairType.image;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-light mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <h1 className="text-3xl font-bold mb-8 dark:text-white">Advanced Chair Customization</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preview Section */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 transition-colors duration-300">
            <div className="aspect-square overflow-hidden rounded-lg relative">
              <img
                src={previewImage}
                alt="Custom Chair Preview"
                className="w-full h-full object-cover"
                style={{ backgroundColor: selectedColor.hexCode }}
              />
              {/* Dynamic Elements */}
              {baseType === 'dynamic' && (
                <img
                  src={selectedWheels.image}
                  alt="Wheels"
                  className="absolute bottom-0 w-full"
                />
              )}
            </div>
          </div>

          {/* Customization Controls */}
          <div className="space-y-8">
            {/* Chair Type Selection */}
            <div>
              <h3 className="font-semibold mb-4 dark:text-white">Chair Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {chairTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedChairType(type)}
                    className={`p-4 rounded-lg border-2 ${
                      selectedChairType.id === type.id
                        ? 'border-primary dark:border-primary-light'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={type.image}
                      alt={type.name}
                      className="w-full h-24 object-cover rounded"
                    />
                    <p className="mt-2 text-sm text-center dark:text-white">{type.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Type-Specific Features */}
            {selectedChairType.name === 'Boss Chair' && (
              <div>
                <h3 className="font-semibold mb-4 dark:text-white">Leather Options</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {leatherTypes.map((leather) => (
                    <button
                      key={leather.id}
                      onClick={() => setSelectedLeather(leather)}
                      className={`p-4 rounded-lg border-2 ${
                        selectedLeather.id === leather.id
                          ? 'border-primary dark:border-primary-light'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={leather.texture}
                        alt={leather.name}
                        className="w-full h-24 object-cover rounded"
                      />
                      <p className="mt-2 text-sm text-center dark:text-white">{leather.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Base Configuration */}
            <div>
              <h3 className="font-semibold mb-4 dark:text-white">Base Type</h3>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setBaseType('static')}
                  className={`px-4 py-2 rounded-lg ${
                    baseType === 'static' 
                      ? 'bg-primary text-white' 
                      : 'bg-neutral-100 dark:bg-neutral-800'
                  }`}
                >
                  Static Base
                </button>
                <button
                  onClick={() => setBaseType('dynamic')}
                  className={`px-4 py-2 rounded-lg ${
                    baseType === 'dynamic' 
                      ? 'bg-primary text-white' 
                      : 'bg-neutral-100 dark:bg-neutral-800'
                  }`}
                >
                  Dynamic Base
                </button>
              </div>

              {baseType === 'static' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {baseDesigns.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => setSelectedBase(design)}
                      className={`p-4 rounded-lg border-2 ${
                        selectedBase.id === design.id
                          ? 'border-primary dark:border-primary-light'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={design.image}
                        alt={design.name}
                        className="w-full h-24 object-cover rounded"
                      />
                      <p className="mt-2 text-sm text-center dark:text-white">{design.name}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wheelDesigns.map((wheel) => (
                    <button
                      key={wheel.id}
                      onClick={() => setSelectedWheels(wheel)}
                      className={`p-4 rounded-lg border-2 ${
                        selectedWheels.id === wheel.id
                          ? 'border-primary dark:border-primary-light'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={wheel.image}
                        alt={wheel.name}
                        className="w-full h-24 object-cover rounded"
                      />
                      <p className="mt-2 text-sm text-center dark:text-white">{wheel.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Armrest Customization */}
            <div>
              <h3 className="font-semibold mb-4 dark:text-white">Armrest Options</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {armrestOptions.map((armrest) => (
                  <button
                    key={armrest.id}
                    onClick={() => setSelectedArmrest(armrest)}
                    className={`p-4 rounded-lg border-2 ${
                      selectedArmrest.id === armrest.id
                        ? 'border-primary dark:border-primary-light'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="h-24 bg-neutral-100 dark:bg-neutral-800 rounded flex items-center justify-center">
                      <span className="text-lg">{armrest.name}</span>
                    </div>
                    <p className="mt-2 text-sm text-center dark:text-white">
                      {armrest.material}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-4 dark:text-white">Primary Color</h3>
              <div className="flex gap-4">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor.id === color.id
                        ? 'border-primary dark:border-primary-light'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.hexCode }}
                  />
                ))}
              </div>
            </div>

            {/* Finalize Button */}
            <button
              onClick={() => alert('Custom chair configuration saved!')}
              className="w-full bg-primary hover:bg-primary/90 text-white dark:bg-primary-light dark:hover:bg-primary-light/90 dark:text-black font-medium py-3 rounded-lg transition-colors"
            >
              Save Custom Design (${
                baseType === 'static' 
                  ? 299 + (selectedChairType.name === 'Boss Chair' ? 200 : 0)
                  : 399 + (selectedChairType.name === 'Boss Chair' ? 200 : 0)
              })
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;