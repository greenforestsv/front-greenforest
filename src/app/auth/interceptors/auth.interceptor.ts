import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { DeviceService } from '../services/device.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const deviceService = inject(DeviceService);
  const token = localStorage.getItem('token');

  const headers: Record<string, string> = {
    'XGF-DEVICE': deviceService.getDevice(),
    'XGF-MODEL': deviceService.getModel(),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return next(
    req.clone({
      setHeaders: headers,
    }),
  );
};
