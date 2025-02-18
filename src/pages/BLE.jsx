import { BleClient, textToDataView } from "@capacitor-community/bluetooth-le";

export const initBLE = async () => {
  try {
    await BleClient.initialize();
    //await BleClient.requestEnable();
    const device = await BleClient.requestDevice({ services: ["19B10000-E8F2-537E-4F6C-D104768A1214"] });
    await BleClient.connect(device.deviceId);

    console.log("Connected to device", device);
    return device;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const writeData = async (deviceID, data) => {
  try {
    await BleClient.write(deviceID, "19B10000-E8F2-537E-4F6C-D104768A1214", "19B10001-E8F2-537E-4F6C-D104768A1214", textToDataView(data));
    console.log("Written: " + data);
  } catch (error) {
    console.log(error);
  }
};
