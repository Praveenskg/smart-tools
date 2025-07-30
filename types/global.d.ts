interface Navigator {
  standalone?: boolean;
}
interface ExifData {
  Make?: string;
  Model?: string;
  FNumber?: number;
  ExposureTime?: number;
  ISO?: number;
  DateTimeOriginal?: string;
  LensModel?: string;
  [key: string]: unknown;
}
