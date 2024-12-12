/* eslint-disable @typescript-eslint/ban-ts-comment */
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useMediaQuery, { mediaQueryBreakpoints } from './use-media-query';

describe('mediaQueryBreakpoints', () => {
  describe('up', () => {
    it('should return the correct min-width media query for xs', () => {
      const result = mediaQueryBreakpoints.up('xs');
      expect(result).toBe('(min-width: 321px)');
    });

    it('should return the correct min-width media query for sm1', () => {
      const result = mediaQueryBreakpoints.up('sm1');
      expect(result).toBe('(min-width: 539px)');
    });

    it('should return the correct min-width media query for sm2', () => {
      const result = mediaQueryBreakpoints.up('sm2');
      expect(result).toBe('(min-width: 541px)');
    });

    it('should return the correct min-width media query for sm3', () => {
      const result = mediaQueryBreakpoints.up('sm3');
      expect(result).toBe('(min-width: 692px)');
    });

    it('should return the correct min-width media query for md2', () => {
      const result = mediaQueryBreakpoints.up('md2');
      expect(result).toBe('(min-width: 1025px)');
    });
    it('should return the correct min-width media query for md3', () => {
      const result = mediaQueryBreakpoints.up('md3');
      expect(result).toBe('(min-width: 1367px)');
    });
    it('should return the correct min-width media query for lg2', () => {
      const result = mediaQueryBreakpoints.up('lg2');
      expect(result).toBe('(min-width: 1921px)');
    });
    it('should return the correct min-width media query for lg3', () => {
      const result = mediaQueryBreakpoints.up('lg3');
      expect(result).toBe('(min-width: 2561px)');
    });
  });

  describe('down', () => {
    it('should return the correct max-width media query for xs', () => {
      const result = mediaQueryBreakpoints.down('xs');
      expect(result).toBe('(max-width: 321px)');
    });

    it('should return the correct max-width media query for sm1', () => {
      const result = mediaQueryBreakpoints.down('sm1');
      expect(result).toBe('(max-width: 539px)');
    });

    it('should return the correct max-width media query for sm2', () => {
      const result = mediaQueryBreakpoints.down('sm2');
      expect(result).toBe('(max-width: 541px)');
    });

    it('should return the correct max-width media query for sm3', () => {
      const result = mediaQueryBreakpoints.down('sm3');
      expect(result).toBe('(max-width: 692px)');
    });

    it('should return the correct max-width media query for md2', () => {
      const result = mediaQueryBreakpoints.down('md2');
      expect(result).toBe('(max-width: 1025px)');
    });
    it('should return the correct max-width media query for md3', () => {
      const result = mediaQueryBreakpoints.down('md3');
      expect(result).toBe('(max-width: 1367px)');
    });
    it('should return the correct max-width media query for lg2', () => {
      const result = mediaQueryBreakpoints.down('lg2');
      expect(result).toBe('(max-width: 1921px)');
    });
    it('should return the correct max-width media query for lg3', () => {
      const result = mediaQueryBreakpoints.down('lg3');
      expect(result).toBe('(max-width: 2561px)');
    });
  });
});

describe('useMediaQuery', () => {
  // Mock matchMedia
  const mockMatchMedia = (matches: boolean) => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });

  beforeEach(() => {
    window.matchMedia = vi.fn();
  });

  it('should return false by default', () => {
    // @ts-ignore
    window.matchMedia.mockImplementation(() => mockMatchMedia(false));

    const { result } = renderHook(() =>
      useMediaQuery(mediaQueryBreakpoints.up('sm2')),
    );

    expect(result.current).toBe(false);
  });

  it('should return true when the media query matches', () => {
    // @ts-ignore
    window.matchMedia.mockImplementation(() => mockMatchMedia(true));

    const { result } = renderHook(() =>
      useMediaQuery(mediaQueryBreakpoints.up('sm2')),
    );

    expect(result.current).toBe(true);
  });

  it('should update when the media query matches change', () => {
    // Mock matchMedia
    const event = vi.fn();
    function mockMatchMedia(matches: boolean) {
      return {
        matches,
        addEventListener: event,
        removeEventListener: vi.fn(),
      };
    }

    // Mock matchMedia to return the current matches state
    window.matchMedia = vi
      .fn()
      .mockImplementationOnce(() => mockMatchMedia(true));

    const { result } = renderHook(() =>
      useMediaQuery(mediaQueryBreakpoints.up('sm2')),
    );
    // Initially matches

    expect(result.current).toBe(true);

    // Simulate media query match change
    // @ts-ignore
    window.matchMedia.mock.results[0].value.matches = false;

    act(() => {
      event.mock.calls[0][1]();
    });

    expect(result.current).toBe(false);
  });
});
