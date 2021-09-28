import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
jest.useFakeTimers();
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
