import { QueryClient } from '@tanstack/react-query';
import * as Clipboard from 'expo-clipboard';
import { DevToolsBubble } from "react-native-react-query-devtools";

export default function TansTackDevTools({ queryClient }: { queryClient: QueryClient }) {
   // Define your copy function based on your platform
  const onCopy = async (text: string) => {
    try {
      // For Expo:
      await Clipboard.setStringAsync(text);
      // OR for React Native CLI:
      // await Clipboard.setString(text);
      return true;
    } catch {
      return false;
    }
  };
  return (
    <DevToolsBubble onCopy={onCopy} queryClient={queryClient} />
  );
}
