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
import {useBarcode} from "../hooks/useBarcode.ts";
import CancelIcon from "../assets/icons/cancel.svg";

const videoElement = ref<HTMLVideoElement | null>()
const stream = ref<MediaStream | null>()
const devices = ref<MediaDeviceInfo[]>([])
const activeDevices = ref('')
const isZoom = ref(false)
const supportedZoom = ref(false)
const {replace} = useRouter()
const {generate, detectFromVideoElement, detect} = useBarcode()
const isRecognition = ref(false)
const isCameraReady = ref(false)


const isOpenAlert = ref(false)
const alertMessage = ref("")

const openAlert = (text: string, time?: number) => {
  alertMessage.value = text
  isOpenAlert.value = true
  if (time)
    setTimeout(() => {
      isOpenAlert.value = false
    }, time)
}


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
  devices.value = allDevice.filter((device) => device.kind == "videoinput");

  const videoTrack = stream.value.getVideoTracks()[0]
  const meta = videoTrack.getCapabilities()

  if ("zoom" in meta) {
    supportedZoom.value = true;
  }
  if (!meta.deviceId) return
  activeDevices.value = meta.deviceId

  videoElement.value.srcObject = stream.value;
  videoElement.value.play()
  isCameraReady.value = true
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

const recognitionHandler = async () => {
  console.log("Начало")

  isRecognition.value = true
  if (!stream.value)
    return
  if (!videoElement.value)
    return

  try {
    const videoTracks = stream.value.getVideoTracks()
    videoElement.value.pause()
    let codes = []

    if ("ImageCapture" in window) {
      const imageCapture = new ImageCapture(videoTracks[0])
      const blob = await imageCapture.takePhoto()
      codes = await detect(blob)
    } else {
      console.log("No ImageCapture API")
      codes = await detectFromVideoElement(videoElement.value)
    }


    if (!codes.length) {
      await videoElement.value?.play()
      openAlert("Штрих-код не найден", 1000)
      return
    }
    const code = codes[0]
    const base64 = await generate(code.rawValue, code.format)

    replace({
      path: RoutesPath.create, state: {
        prevData: {
          barcode: base64,
          type: code.format,
          data: code.rawValue
        }
      }
    })
    videoTracks.forEach((track) => {
      track.stop();
    });
  } catch (e) {
    console.error(e)
    openAlert("данный формат не поддерживается", 1500)
    videoElement.value?.play()
  } finally {
    isRecognition.value = false
  }
}

const exit = () => {
  if (stream.value) {
    const videoTracks = stream.value.getVideoTracks()
    videoTracks.forEach((track) => {
      track.stop();
    });
  }
  replace(RoutesPath.select)
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
        <video class="w-full h-full object-cover z-20 transition-opacity" autoplay muted playsinline ref="videoElement"
               :class="{'opacity-0': !isCameraReady}"></video>
      </div>

      <div class="control-panel flex-1 bg-black w-full text-white flex items-center justify-center flex-col gap-5 py-5">
        <div class="flex items-center justify-evenly w-full">
          <Button only-icon bg-color="bg-slate-600" @click="exit">
            <template v-slot:icon-left>
              <BackIcon class="fill-slate-300 w-4 h-4"/>
            </template>

          </Button>
          <Button class="w-20 h-20 !rounded-full border-4 border-slate-300" bg-color="bg-slate-600"
                  @click="recognitionHandler">
            <template v-slot:icon-left>
              <span class="loader" v-if="isRecognition"></span>
              <ImageSearchIcon v-else class="fill-slate-300 w-8 h-8"/>
            </template>
          </Button>

          <Button only-icon bg-color="bg-slate-600" @click="zoomChange" :disabled="!supportedZoom">
            <template v-slot:icon-left>
              <X1Icon v-if="isZoom" class="fill-slate-300"/>
              <X2Icon v-else class="fill-slate-300"/>
            </template>
          </Button>
        </div>
        <div class="flex items-center justify-center gap-5 overflow-y-auto w-full min-h-[40px]">
          <Button v-for="(device, i) in devices"
                  @click="setDevice($event, device)"
                  class="text-xs px-3 py-2 !rounded-full border-2 border-slate-600"
                  :class="{'!border-slate-300': device.deviceId === activeDevices}"
                  bg-color="bg-slate-600"
                  text-color="text-slate-200">
            Камера {{ i + 1 }}
          </Button>
        </div>
      </div>
    </div>
    <div
        class="alert-wrapper bg-red-500 rounded-t-md shadow-sm p-2 flex items-center justify-center gap-3 w-full transition-transform duration-500 z-20"
        :class="{'open': isOpenAlert}"
    >
      <CancelIcon class="fill-white w-6 h-6"/>
      <div class="alert-message text-md text-white text-center">{{ alertMessage }}</div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.camera-preview {
  flex: 6;
}

.loader {
  animation: rotate 1s infinite;
  height: 50px;
  width: 50px;
}

.loader:before,
.loader:after {
  border-radius: 50%;
  content: "";
  display: block;
  height: 20px;
  width: 20px;
}

.loader:before {
  animation: ball1 1s infinite;
  background-color: #a6afbc;
  box-shadow: 30px 0 0 #a6afbc;
  margin-bottom: 10px;
}

.loader:after {
  animation: ball2 1s infinite;
  background-color: #a6afbc;
  box-shadow: 30px 0 0 #a6afbc;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(0.4)
  }
  50% {
    transform: rotate(360deg) scale(0.6)
  }
  100% {
    transform: rotate(720deg) scale(0.5)
  }
}

@keyframes ball1 {
  0% {
    box-shadow: 30px 0 0 #a6afbc;
  }
  50% {
    box-shadow: 0 0 0 #a6afbc;
    margin-bottom: 0;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #a6afbc;
    margin-bottom: 10px;
  }
}

@keyframes ball2 {
  0% {
    box-shadow: 30px 0 0 #a6afbc;
  }
  50% {
    box-shadow: 0 0 0 #a6afbc;
    margin-top: -20px;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #a6afbc;
    margin-top: 0;
  }
}

.alert-wrapper {
  position: fixed;
  top: 0;
  transform: translateY(-250%);
}

.alert-wrapper.open {
  transform: translateY(0);
}

@media (max-width: 370px) {
  .alert-message {
    @apply text-xs
  }
}

</style>