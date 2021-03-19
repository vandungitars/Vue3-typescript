import {ref, onMounted, onUnmounted} from '@vue/composition-api'

export function useActivityTracker() {
    let intervalIdleTime = null
    const idleTime = ref(0)
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']

    function activity() {
        idleTime.value = 0
    }

    intervalIdleTime = setInterval(() => idleTime.value++, 1000)
    onMounted(() => {
        activityEvents.forEach(eventName => {
            document.addEventListener(eventName, activity, true)
        })
    })
    onUnmounted(() => {
        activityEvents.forEach(eventName => {
            document.removeEventListener(eventName, activity, true)
        })
        clearInterval(intervalIdleTime)
    })
    return {
        idleTime
    }
}
