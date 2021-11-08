import * as React from 'react';
import { MessagerContext } from './MessagerProvider';

export function useMessager() {
  const messager = React.useContext(MessagerContext);

  return messager;
}
