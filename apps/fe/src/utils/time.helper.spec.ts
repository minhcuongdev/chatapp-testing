import { TimeHelper } from './time.helper';

describe('TimeHelper', () => {
  describe('convertTo12HourFormat', () => {
    it('should convert ISO date string to 12-hour time format (AM)', () => {
      const isoDate = '2024-12-12T05:30:00Z'; // 5:30 AM UTC
      const expected = '12:30 PM';

      const result = TimeHelper.convertTo12HourFormat(isoDate);
      expect(result).toBe(expected);
    });

    it('should convert ISO date string to 12-hour time format (PM)', () => {
      const isoDate = '2024-12-12T15:45:00Z'; // 3:45 PM UTC
      const expected = '10:45 PM';

      const result = TimeHelper.convertTo12HourFormat(isoDate);

      expect(result).toBe(expected);
    });

    it('should handle midnight (12:00 AM)', () => {
      const isoDate = '2024-12-12T00:00:00Z'; // Midnight UTC
      const expected = '7:00 AM';

      const result = TimeHelper.convertTo12HourFormat(isoDate);

      expect(result).toBe(expected);
    });

    it('should handle noon (12:00 PM)', () => {
      const isoDate = '2024-12-12T12:00:00Z'; // Noon UTC
      const expected = '7:00 PM';

      const result = TimeHelper.convertTo12HourFormat(isoDate);

      expect(result).toBe(expected);
    });

    it('should pad minutes with leading zeros when necessary', () => {
      const isoDate = '2024-12-12T01:05:00Z'; // 1:05 AM UTC
      const expected = '8:05 AM';

      const result = TimeHelper.convertTo12HourFormat(isoDate);

      expect(result).toBe(expected);
    });
  });
});
