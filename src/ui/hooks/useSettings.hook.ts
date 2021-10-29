import * as React from "react";
import SettingsService, { Settings } from '../settings/settings.service';

export function useSettings<T extends keyof Settings>(key: T): Settings[T] {
    const [ value, setValue ] = React.useState<T>();
  
    React.useEffect(() => {
      const unsubscribe = SettingsService.onDidChange(key, (value: any) => {
        setValue(value);
      });
  
      return () => { unsubscribe() };
    }, [])
  
    return value as unknown as Settings[T];
  }