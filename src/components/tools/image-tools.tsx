"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Crop,
  Palette,
  FileImage,
  Eye,
  Settings,
  Zap,
  Download,
  ImagesIcon,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function ImageTools() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState("resizer");

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
          <TabsTrigger value="resizer" className="flex items-center gap-2">
            <Crop className="h-4 w-4" />
            <span className="hidden sm:inline">Resizer</span>
          </TabsTrigger>
          <TabsTrigger value="converter" className="flex items-center gap-2">
            <FileImage className="h-4 w-4" />
            <span className="hidden sm:inline">Converter</span>
          </TabsTrigger>
          <TabsTrigger value="compressor" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Compressor</span>
          </TabsTrigger>
          <TabsTrigger value="color-picker" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Colors</span>
          </TabsTrigger>
          <TabsTrigger value="background-remover" className="flex items-center gap-2">
            <ImagesIcon className="h-4 w-4" />
            <span className="hidden sm:inline">BG Remove</span>
          </TabsTrigger>
          <TabsTrigger value="cropper" className="flex items-center gap-2">
            <Crop className="h-4 w-4" />
            <span className="hidden sm:inline">Cropper</span>
          </TabsTrigger>
          <TabsTrigger value="metadata" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Metadata</span>
          </TabsTrigger>
          <TabsTrigger value="filters" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </TabsTrigger>
        </TabsList>
        
        {!selectedImage && (
          <Card className="mb-6 modern-card">
            <CardContent className="pt-6">
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Upload an Image</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop an image here, or click to select
                </p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Image
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Selected Image Display */}
        {selectedImage && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Selected Image</CardTitle>
                  <CardDescription>
                    {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedImage(null);
                    setImageUrl("");
                  }}
                >
                  Change Image
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Image
                  src={imageUrl}
                  alt="Selected"
                  height={256}
                  width={256}
                  className="object-contain rounded-lg border"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tool Content */}
        <TabsContent value="resizer" className="space-y-4">
          <ImageResizer selectedImage={selectedImage} />
        </TabsContent>

        <TabsContent value="converter" className="space-y-4">
          <ImageConverter selectedImage={selectedImage} />
        </TabsContent>

        <TabsContent value="compressor" className="space-y-4">
          <ImageCompressor selectedImage={selectedImage} />
        </TabsContent>

        <TabsContent value="color-picker" className="space-y-4">
          <ColorPicker selectedImage={selectedImage} />
        </TabsContent>

        <TabsContent value="background-remover" className="space-y-4">
          <BackgroundRemover selectedImage={selectedImage} />
        </TabsContent>

        <TabsContent value="cropper" className="space-y-4">
          <ImageCropper selectedImage={selectedImage} />
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">
          <MetadataViewer selectedImage={selectedImage} />
        </TabsContent>

        <TabsContent value="filters" className="space-y-4">
          <ImageFilters selectedImage={selectedImage} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Tool Components
function ImageResizer({ selectedImage }: { selectedImage: File | null }) {
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);

      // Get original dimensions
      const img = new window.Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = url;
    }
  }, [selectedImage]);

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setHeight(Math.round(newWidth / ratio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * ratio));
    }
  };

  const resetToOriginal = () => {
    if (originalDimensions) {
      setWidth(originalDimensions.width);
      setHeight(originalDimensions.height);
    }
  };

  const downloadResizedImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        blob => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `resized_${selectedImage?.name || "image"}`;
            a.click();
            URL.revokeObjectURL(url);
          }
        },
        "image/jpeg",
        0.9,
      );
    };

    img.src = imageUrl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crop className="h-5 w-5" />
          Image Resizer
        </CardTitle>
        <CardDescription>Resize your image to specific dimensions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedImage ? (
          <div className="text-center py-8 text-muted-foreground">
            Upload an image to start resizing
          </div>
        ) : (
          <div className="space-y-6">
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={e => handleWidthChange(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                    min="1"
                    max="4000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={e => handleHeightChange(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                    min="1"
                    max="4000"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="aspect-ratio"
                    checked={maintainAspectRatio}
                    onChange={e => setMaintainAspectRatio(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="aspect-ratio" className="text-sm">
                    Maintain aspect ratio
                  </label>
                </div>
                {originalDimensions && (
                  <Button variant="outline" onClick={resetToOriginal} className="w-full">
                    Reset to Original ({originalDimensions.width} × {originalDimensions.height})
                  </Button>
                )}
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Preview</label>
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="text-center text-sm text-muted-foreground mb-2">
                    {width} × {height} pixels
                  </div>
                  <div className="flex justify-center">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        width={Math.min(width, 200)}
                        height={Math.min(height, 200)}
                        className="border rounded object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <Button onClick={downloadResizedImage} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Resized Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ImageConverter({ selectedImage }: { selectedImage: File | null }) {
  const [targetFormat, setTargetFormat] = useState<string>("jpeg");
  const [quality, setQuality] = useState<number>(90);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
    }
  }, [selectedImage]);

  const convertImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      let mimeType = "image/jpeg";
      let fileExtension = "jpg";

      switch (targetFormat) {
        case "png":
          mimeType = "image/png";
          fileExtension = "png";
          break;
        case "webp":
          mimeType = "image/webp";
          fileExtension = "webp";
          break;
        case "jpeg":
        default:
          mimeType = "image/jpeg";
          fileExtension = "jpg";
          break;
      }

      canvas.toBlob(
        blob => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const originalName = selectedImage?.name || "image";
            const nameWithoutExt = originalName.split(".").slice(0, -1).join(".");
            a.download = `${nameWithoutExt}.${fileExtension}`;
            a.click();
            URL.revokeObjectURL(url);
          }
        },
        mimeType,
        targetFormat === "jpeg" ? quality / 100 : 1,
      );
    };

    img.src = imageUrl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileImage className="h-5 w-5" />
          Format Converter
        </CardTitle>
        <CardDescription>Convert your image to different formats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedImage ? (
          <div className="text-center py-8 text-muted-foreground">
            Upload an image to convert format
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Target Format</label>
                  <select
                    value={targetFormat}
                    onChange={e => setTargetFormat(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>

                {targetFormat === "jpeg" && (
                  <div>
                    <label className="text-sm font-medium">Quality: {quality}%</label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={quality}
                      onChange={e => setQuality(Number(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  <p>
                    <strong>JPEG:</strong> Good for photos, smaller file size
                  </p>
                  <p>
                    <strong>PNG:</strong> Lossless, supports transparency
                  </p>
                  <p>
                    <strong>WebP:</strong> Modern format, excellent compression
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Original Format</label>
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="text-center text-sm text-muted-foreground mb-2">
                    {selectedImage.type || "Unknown"}
                  </div>
                  <div className="flex justify-center">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        height={128}
                        width={128}
                        alt="Original"
                        className="object-contain border rounded"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={convertImage} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Convert to {targetFormat.toUpperCase()}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ImageCompressor({ selectedImage }: { selectedImage: File | null }) {
  const [compressionLevel, setCompressionLevel] = useState<number>(80);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
      setOriginalSize(selectedImage.size);
      setCompressedSize(0);
    }
  }, [selectedImage]);

  const compressImage = () => {
    setIsCompressing(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        blob => {
          if (blob) {
            setCompressedSize(blob.size);
            setIsCompressing(false);

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const originalName = selectedImage?.name || "image";
            const nameWithoutExt = originalName.split(".").slice(0, -1).join(".");
            a.download = `${nameWithoutExt}_compressed.jpg`;
            a.click();
            URL.revokeObjectURL(url);
          }
        },
        "image/jpeg",
        compressionLevel / 100,
      );
    };

    img.src = imageUrl;
  };

  const getCompressionRatio = () => {
    if (originalSize === 0) return 0;
    return (((originalSize - compressedSize) / originalSize) * 100).toFixed(1);
  };

  const getSizeReduction = () => {
    if (originalSize === 0) return 0;
    return ((originalSize - compressedSize) / 1024 / 1024).toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Image Compressor
        </CardTitle>
        <CardDescription>Compress images to reduce file size</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedImage ? (
          <div className="text-center py-8 text-muted-foreground">Upload an image to compress</div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">
                    Compression Quality: {compressionLevel}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="95"
                    value={compressionLevel}
                    onChange={e => setCompressionLevel(Number(e.target.value))}
                    className="w-full mt-1"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Lower quality = smaller file size
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Original Size:</span>
                    <span>{(originalSize / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                  {compressedSize > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Compressed Size:</span>
                        <span>{(compressedSize / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Size Reduction:</span>
                        <span>
                          {getSizeReduction()} MB ({getCompressionRatio()}%)
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    <strong>Recommended:</strong>
                  </p>
                  <p>• 90-95%: High quality, minimal compression</p>
                  <p>• 70-85%: Good balance of quality and size</p>
                  <p>• 50-70%: Significant compression, quality loss</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Preview</label>
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="flex justify-center">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        height={128}
                        width={128}
                        alt="Original"
                        className="object-contain border rounded"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={compressImage} disabled={isCompressing} className="w-full">
              {isCompressing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Compressing...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Compress & Download
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ColorPicker({ selectedImage }: { selectedImage: File | null }) {
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState<boolean>(false);

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
      setColors([]);
      setSelectedColor("");
    }
  }, [selectedImage]);

  const extractColors = () => {
    setIsExtracting(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();

    img.onload = () => {
      // Scale down for faster processing
      const scale = Math.min(1, 200 / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        const colorMap = new Map<string, number>();

        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];

          // Skip transparent pixels
          if (imageData.data[i + 3] < 128) continue;

          // Quantize colors to reduce noise
          const quantizedR = Math.round(r / 32) * 32;
          const quantizedG = Math.round(g / 32) * 32;
          const quantizedB = Math.round(b / 32) * 32;

          const color = `rgb(${quantizedR}, ${quantizedG}, ${quantizedB})`;
          colorMap.set(color, (colorMap.get(color) || 0) + 1);
        }

        // Sort by frequency and get top colors
        const sortedColors = Array.from(colorMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 12)
          .map(([color]) => color);

        setColors(sortedColors);
        if (sortedColors.length > 0) {
          setSelectedColor(sortedColors[0]);
        }
      }
      setIsExtracting(false);
    };

    img.src = imageUrl;
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const getHexColor = (rgbColor: string) => {
    const match = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    }
    return rgbColor;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Picker
        </CardTitle>
        <CardDescription>Extract colors from your image</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedImage ? (
          <div className="text-center py-8 text-muted-foreground">
            Upload an image to extract colors
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Button onClick={extractColors} disabled={isExtracting} className="w-full">
                  {isExtracting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Extracting Colors...
                    </>
                  ) : (
                    <>
                      <Palette className="h-4 w-4 mr-2" />
                      Extract Colors
                    </>
                  )}
                </Button>

                {colors.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Color Palette</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {colors.map((color, index) => (
                        <div
                          key={index}
                          className="relative group cursor-pointer"
                          onClick={() => setSelectedColor(color)}
                        >
                          <div
                            className="w-full h-16 rounded-lg border-2 border-muted-foreground/20 hover:border-muted-foreground/50 transition-colors"
                            style={{ backgroundColor: color }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={e => {
                                e.stopPropagation();
                                copyToClipboard(getHexColor(color));
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Selected Color</label>
                  {selectedColor ? (
                    <div className="space-y-2">
                      <div
                        className="w-full h-20 rounded-lg border"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>RGB:</span>
                          <span>{selectedColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>HEX:</span>
                          <span>{getHexColor(selectedColor)}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(getHexColor(selectedColor))}
                        className="w-full"
                      >
                        Copy HEX
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full h-20 rounded-lg border bg-muted/20 flex items-center justify-center text-muted-foreground">
                      No color selected
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BackgroundRemover({ selectedImage }: { selectedImage: File | null }) {
  const [tolerance, setTolerance] = useState<number>(30);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
      setProcessedImageUrl("");
    }
  }, [selectedImage]);

  const removeBackground = () => {
    setIsProcessing(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        // Parse background color
        const bgColor = backgroundColor.startsWith("#")
          ? backgroundColor.substring(1)
          : backgroundColor;
        const bgR = parseInt(bgColor.substring(0, 2), 16);
        const bgG = parseInt(bgColor.substring(2, 4), 16);
        const bgB = parseInt(bgColor.substring(4, 6), 16);

        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];

          // Calculate color difference
          const diff = Math.sqrt(
            Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2),
          );

          // If color is similar to background, make it transparent
          if (diff <= tolerance) {
            imageData.data[i + 3] = 0; // Set alpha to 0
          }
        }

        ctx?.putImageData(imageData, 0, 0);

        canvas.toBlob(blob => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setProcessedImageUrl(url);
            setIsProcessing(false);
          }
        }, "image/png");
      }
    };

    img.src = imageUrl;
  };

  const downloadProcessedImage = () => {
    if (processedImageUrl) {
      const a = document.createElement("a");
      a.href = processedImageUrl;
      const originalName = selectedImage?.name || "image";
      const nameWithoutExt = originalName.split(".").slice(0, -1).join(".");
      a.download = `${nameWithoutExt}_no_bg.png`;
      a.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImagesIcon className="h-5 w-5" />
          Background Remover
        </CardTitle>
        <CardDescription>Remove background from images automatically</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedImage ? (
          <div className="text-center py-8 text-muted-foreground">
            Upload an image to remove background
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Background Color</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={e => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 border rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={e => setBackgroundColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Tolerance: {tolerance}</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={tolerance}
                    onChange={e => setTolerance(Number(e.target.value))}
                    className="w-full mt-1"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Higher tolerance = more aggressive removal
                  </div>
                </div>

                <Button onClick={removeBackground} disabled={isProcessing} className="w-full">
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ImagesIcon className="h-4 w-4 mr-2" />
                      Remove Background
                    </>
                  )}
                </Button>

                <div className="text-sm text-muted-foreground">
                  <p>
                    <strong>Tips:</strong>
                  </p>
                  <p>• Works best with solid color backgrounds</p>
                  <p>• Adjust tolerance for better results</p>
                  <p>• Output will be PNG with transparency</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Original</label>
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="flex justify-center">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          height={128}
                          width={128}
                          alt="Original"
                          className="object-contain border rounded"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {processedImageUrl && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Processed</label>
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <div className="flex justify-center">
                        <Image
                          src={processedImageUrl}
                          alt="Processed"
                          height={128}
                          width={128}
                          className="object-contain border rounded"
                        />
                      </div>
                    </div>
                    <Button onClick={downloadProcessedImage} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ImageCropper({ selectedImage }: { selectedImage: File | null }) {
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);

      const img = new window.Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        // Set initial crop area to center
        const centerX = img.width / 2 - 100;
        const centerY = img.height / 2 - 100;
        setCropArea({
          x: Math.max(0, centerX),
          y: Math.max(0, centerY),
          width: Math.min(200, img.width),
          height: Math.min(200, img.height),
        });
      };
      img.src = url;
    }
  }, [selectedImage]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is inside crop area
    if (
      x >= cropArea.x &&
      x <= cropArea.x + cropArea.width &&
      y >= cropArea.y &&
      y <= cropArea.y + cropArea.height
    ) {
      setIsDragging(true);
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef) return;

    const rect = canvasRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newX = Math.max(0, Math.min(imageDimensions.width - cropArea.width, x - dragStart.x));
    const newY = Math.max(0, Math.min(imageDimensions.height - cropArea.height, y - dragStart.y));

    setCropArea(prev => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const cropImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();

    img.onload = () => {
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      ctx?.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height,
      );

      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          const originalName = selectedImage?.name || "image";
          const nameWithoutExt = originalName.split(".").slice(0, -1).join(".");
          a.download = `${nameWithoutExt}_cropped.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    };

    img.src = imageUrl;
  };

  const resetCrop = () => {
    const centerX = imageDimensions.width / 2 - 100;
    const centerY = imageDimensions.height / 2 - 100;
    setCropArea({
      x: Math.max(0, centerX),
      y: Math.max(0, centerY),
      width: Math.min(200, imageDimensions.width),
      height: Math.min(200, imageDimensions.height),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crop className="h-5 w-5" />
          Image Cropper
        </CardTitle>
        <CardDescription>Crop your image to specific dimensions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedImage ? (
          <div className="text-center py-8 text-muted-foreground">Upload an image to crop</div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Crop Area</label>
                  <div className="text-sm text-muted-foreground">
                    <div>
                      Position: ({Math.round(cropArea.x)}, {Math.round(cropArea.y)})
                    </div>
                    <div>
                      Size: {Math.round(cropArea.width)} × {Math.round(cropArea.height)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetCrop} className="flex-1">
                    Reset
                  </Button>
                  <Button onClick={cropImage} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Crop & Download
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    <strong>Instructions:</strong>
                  </p>
                  <p>• Click and drag the crop area to move it</p>
                  <p>• The crop area is shown as a dashed rectangle</p>
                  <p>• Use Reset to center the crop area</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Preview</label>
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="flex justify-center">
                    <canvas
                      ref={setCanvasRef}
                      width={Math.min(300, imageDimensions.width)}
                      height={Math.min(300, imageDimensions.height)}
                      className="border rounded cursor-move"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MetadataViewer({ selectedImage }: { selectedImage: File | null }) {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);

      const img = new window.Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = url;
    }
  }, [selectedImage]);

  const getAspectRatio = () => {
    if (!imageDimensions) return "N/A";
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(imageDimensions.width, imageDimensions.height);
    return `${imageDimensions.width / divisor}:${imageDimensions.height / divisor}`;
  };

  const getMegapixels = () => {
    if (!imageDimensions) return "N/A";
    return ((imageDimensions.width * imageDimensions.height) / 1000000).toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Metadata Viewer
        </CardTitle>
        <CardDescription>View image metadata and EXIF information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedImage ? (
          <div className="text-center py-8 text-muted-foreground">
            Upload an image to view metadata
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">File Information</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Name: {selectedImage.name}</p>
                  <p>Size: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p>Type: {selectedImage.type || "Unknown"}</p>
                  <p>Last Modified: {new Date(selectedImage.lastModified).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Image Details</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    Dimensions:{" "}
                    {imageDimensions
                      ? `${imageDimensions.width} × ${imageDimensions.height}`
                      : "Loading..."}
                  </p>
                  <p>Aspect Ratio: {getAspectRatio()}</p>
                  <p>Megapixels: {getMegapixels()}</p>
                  <p>Color Space: sRGB</p>
                </div>
              </div>
            </div>

            {imageDimensions && (
              <div className="space-y-2">
                <p className="font-medium">Image Preview</p>
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="flex justify-center">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        height={128}
                        width={128}
                        alt="Original"
                        className="object-contain border rounded"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ImageFilters({ selectedImage }: { selectedImage: File | null }) {
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
  });
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
      setProcessedImageUrl("");
      setFilters({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        grayscale: 0,
        sepia: 0,
      });
    }
  }, [selectedImage]);

  const applyFilters = () => {
    if (!imageUrl) return;
    setIsProcessing(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          // Brightness
          r = Math.min(255, Math.max(0, r * (filters.brightness / 100)));
          g = Math.min(255, Math.max(0, g * (filters.brightness / 100)));
          b = Math.min(255, Math.max(0, b * (filters.brightness / 100)));

          // Contrast
          const factor = (259 * (filters.contrast + 255)) / (255 * (259 - filters.contrast));
          r = Math.min(255, Math.max(0, factor * (r - 128) + 128));
          g = Math.min(255, Math.max(0, factor * (g - 128) + 128));
          b = Math.min(255, Math.max(0, factor * (b - 128) + 128));

          // Saturation
          const gray = 0.2989 * r + 0.587 * g + 0.114 * b;
          r = gray + (filters.saturation / 100) * (r - gray);
          g = gray + (filters.saturation / 100) * (g - gray);
          b = gray + (filters.saturation / 100) * (b - gray);

          // Grayscale
          if (filters.grayscale > 0) {
            const grayValue = 0.2989 * r + 0.587 * g + 0.114 * b;
            r = r + (filters.grayscale / 100) * (grayValue - r);
            g = g + (filters.grayscale / 100) * (grayValue - g);
            b = b + (filters.grayscale / 100) * (grayValue - b);
          }

          // Sepia
          if (filters.sepia > 0) {
            const sr = r * 0.393 + g * 0.769 + b * 0.189;
            const sg = r * 0.349 + g * 0.686 + b * 0.168;
            const sb = r * 0.272 + g * 0.534 + b * 0.131;
            r = r + (filters.sepia / 100) * (sr - r);
            g = g + (filters.sepia / 100) * (sg - g);
            b = b + (filters.sepia / 100) * (sb - b);
          }

          data[i] = Math.min(255, Math.max(0, r));
          data[i + 1] = Math.min(255, Math.max(0, g));
          data[i + 2] = Math.min(255, Math.max(0, b));
        }

        ctx?.putImageData(imageData, 0, 0);

        canvas.toBlob(
          blob => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setProcessedImageUrl(url);
              setIsProcessing(false);
            }
          },
          "image/jpeg",
          0.9,
        );
      }
    };

    img.onerror = () => {
      toast.error("Image failed to load.");
      setIsProcessing(false);
    };

    img.src = imageUrl;
  };

  const downloadFilteredImage = () => {
    if (processedImageUrl) {
      const a = document.createElement("a");
      a.href = processedImageUrl;
      const originalName = selectedImage?.name || "image";
      const nameWithoutExt = originalName.split(".").slice(0, -1).join(".");
      a.download = `${nameWithoutExt}_filtered.jpg`;
      a.click();
    }
  };

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      grayscale: 0,
      sepia: 0,
    });
    setProcessedImageUrl("");
  };

  const getFilterStyle = () => {
    return {
      filter: `
        brightness(${filters.brightness}%) 
        contrast(${filters.contrast}%) 
        saturate(${filters.saturation}%) 
        blur(${filters.blur}px) 
        grayscale(${filters.grayscale}%) 
        sepia(${filters.sepia}%)
      `,
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Image Filters
        </CardTitle>
        <CardDescription>Apply filters and adjustments to your image</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedImage ? (
          <div className="text-center py-8 text-muted-foreground">
            Upload an image to apply filters
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Brightness: {filters.brightness}%</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.brightness}
                    onChange={e =>
                      setFilters(prev => ({ ...prev, brightness: Number(e.target.value) }))
                    }
                    className="w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Contrast: {filters.contrast}%</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.contrast}
                    onChange={e =>
                      setFilters(prev => ({ ...prev, contrast: Number(e.target.value) }))
                    }
                    className="w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Saturation: {filters.saturation}%</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={filters.saturation}
                    onChange={e =>
                      setFilters(prev => ({ ...prev, saturation: Number(e.target.value) }))
                    }
                    className="w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Blur: {filters.blur}px</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={filters.blur}
                    onChange={e => setFilters(prev => ({ ...prev, blur: Number(e.target.value) }))}
                    className="w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Grayscale: {filters.grayscale}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.grayscale}
                    onChange={e =>
                      setFilters(prev => ({ ...prev, grayscale: Number(e.target.value) }))
                    }
                    className="w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Sepia: {filters.sepia}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.sepia}
                    onChange={e => setFilters(prev => ({ ...prev, sepia: Number(e.target.value) }))}
                    className="w-full mt-1"
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetFilters} className="flex-1">
                    Reset
                  </Button>
                  <Button onClick={applyFilters} disabled={isProcessing} className="flex-1">
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Settings className="h-4 w-4 mr-2" />
                        Apply Filters
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Original</label>
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="flex justify-center">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt="Preview"
                          width={128}
                          height={128}
                          className="object-contain border rounded"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Preview</label>
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="flex justify-center">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt="Preview"
                          width={128}
                          height={128}
                          className="object-contain border rounded"
                          style={getFilterStyle()}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {processedImageUrl && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Processed</label>
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <div className="flex justify-center">
                        <Image
                          src={processedImageUrl}
                          alt="Original"
                          width={128}
                          height={128}
                          className="object-contain border rounded"
                        />
                      </div>
                    </div>
                    <Button onClick={downloadFilteredImage} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
