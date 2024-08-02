<script setup lang="ts">
import DefaultLayout from "../layouts/DefaultLayout.vue";
import {onMounted, ref} from "vue";
import CameraIcon from "../assets/icons/camera.svg"
import ImageSearchIcon from "../assets/icons/image_search.svg"
import BackIcon from "../assets/icons/back.svg"
import X2Icon from "../assets/icons/2x.svg"
import X1Icon from "../assets/icons/1x.svg"
import Button from "../components/UI/Button.vue";
import {useRouter} from "vue-router";
import {RoutesPath} from "../router/router.ts";

const videoElement = ref<HTMLVideoElement | null>()
const stream = ref<MediaStream | null>()
const devices = ref<MediaDeviceInfo[]>([])
const activeDevices = ref('')
const isZoom = ref(false)
const supportedZoom = ref(false)
const {push} = useRouter()
onMounted(async () => {

  if (!videoElement.value)
    return
  console.log("Start video preview")
  stream.value = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: {
        ideal: "environment",
      },
    },
    audio: false,
  });


  const allDevice = await navigator.mediaDevices.enumerateDevices();
  // devices.value = allDevice.filter((device) => device.kind == "videoinput" && device.label.includes("back"));
  devices.value = allDevice.filter((device) => device.kind == "videoinput");

  const videoTrack = stream.value.getVideoTracks()[0]
  const meta = videoTrack.getCapabilities()

  if ("zoom" in meta) {
    supportedZoom.value = true;
  }
  if (!meta.deviceId) return
  activeDevices.value = meta.deviceId

  console.log(activeDevices.value)
  console.log(stream.value)
  videoElement.value.srcObject = stream.value;
  videoElement.value.play()
})

const setDevice = async (_: MouseEvent, device: MediaDeviceInfo) => {
  if (!videoElement.value)
    return
  stream.value = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: device.deviceId
    },
    audio: false,
  });
  activeDevices.value = device.deviceId
  videoElement.value.srcObject = stream.value;
  videoElement.value.play()
}

const zoomChange = async () => {
  const zoom = isZoom.value ? 1 : 2;
  console.log(zoom)
  const videoTrack = stream.value?.getVideoTracks()[0]
  if (videoTrack)
    await videoTrack.applyConstraints({advanced: [{zoom}]});
  isZoom.value = !isZoom.value
}
</script>

<template>
  <DefaultLayout>
    <div class="h-dvh flex justify-start items-center flex-col">
      <div class="camera-preview w-full flex items-center justify-center">
        <div class="w-full absolute flex items-center justify-center flex-col gap-3 z-0">
          <CameraIcon class="w-20 h-20 fill-gray-400"/>
          <div class="text-md text-gray-500 font-bold">Запуск камеры...</div>
        </div>
        <video class="w-full h-full object-cover z-20" autoplay muted playsinline ref="videoElement"></video>
      </div>

      <div class="control-panel flex-1 bg-black w-full text-white flex items-center justify-center flex-col gap-5 py-5">
        <div class="flex items-center justify-evenly w-full">
          <Button only-icon bg-color="bg-slate-600" @click="() => push(RoutesPath.create)">
            <template v-slot:icon-left>
              <BackIcon class="fill-slate-300 w-4 h-4"/>
            </template>

          </Button>
          <Button class="w-20 h-20 !rounded-full border-4 border-slate-300" bg-color="bg-slate-600">
            <template v-slot:icon-left>
              <ImageSearchIcon class="fill-slate-300 w-8 h-8"/>
            </template>
          </Button>

          <Button only-icon bg-color="bg-slate-600" @click="zoomChange" :disabled="!supportedZoom">
            <template v-slot:icon-left>
              <X1Icon v-if="isZoom" class="fill-slate-300"/>
              <X2Icon v-else class="fill-slate-300"/>


            </template>
          </Button>
        </div>
        <div class="flex items-center justify-center gap-5 overflow-y-auto w-full">
          <Button v-for="(device, i) in devices"
                  @click="setDevice($event, device)"
                  class="text-md px-3 py-2 !rounded-full border-2 border-slate-600"
                  :class="{'!border-slate-300': device.deviceId === activeDevices}"
                  bg-color="bg-slate-600"
                  text-color="text-slate-200">
            Камера {{ i + 1 }}
          </Button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.camera-preview {
  flex: 6;
}

</style>