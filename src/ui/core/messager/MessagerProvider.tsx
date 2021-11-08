import * as React from 'react';
import { setIsInitializing, useAppDispatch } from '../../store';
import { MessagerService, createMessagerService } from './messager.service';

export const MessagerContext = React.createContext<undefined | MessagerService>(undefined);

type Props = {
  children?: React.ReactNode;
};

export function MessagerProvider(props: Props) {
  const [messagerService, setMessagerService] = React.useState<MessagerService | undefined>();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const initialize = async () => {
      dispatch(setIsInitializing(true));

      const bridgeAPI = await window.bridge.initialize();

      setMessagerService(createMessagerService(bridgeAPI.messager));

      dispatch(setIsInitializing(false));
    };

    initialize();
  }, []);

  return <MessagerContext.Provider value={messagerService}>{props.children}</MessagerContext.Provider>;
}
