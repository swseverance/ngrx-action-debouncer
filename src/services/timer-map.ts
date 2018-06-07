import { InjectionToken } from '@angular/core';

export const TIMER_MAP = new InjectionToken<Map<string, any>>(
  'TimerMap'
);

export const timerMapFactory = function() {
  return new Map();
};
