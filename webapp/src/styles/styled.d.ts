import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      surface: string;
      error: string;
      onPrimary: string;
      onPrimary2: string;
      onBackground: string;
      onSurface: string;
      onError: string;
    };
    zIndex: {
      appBar: number
      drawer: number
      modal: number
      snackbar: number
      tooltip: number
    }
  }
}