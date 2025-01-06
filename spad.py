import sounddevice as sd
import soundfile as sf
import keyboard
import pygame

# Инициализация звука
pygame.mixer.init()

# Настройка виртуального устройства 
virtual_device_name = 'Microphone (2- Razer Seiren V2 Pro)'  # Поменяйте на ваше устройство                  Microphone (2- Razer Siren V2 Pro)
device_index = None

# Получение индекса устройства
for i, device in enumerate(sd.query_devices()):
    if virtual_device_name in device['name']:
        device_index = i
        break

if device_index is None:
    print(f"Устройство '{virtual_device_name}' не найдено.")
    exit()

# Словарь с горячими клавишами и файлами
sound_map = {
    '1': 'sistema-poiska-pi-sa.mp3',
    '2': 'sistema-poiska-pi-sa.mp3'
}

# Проигрывание звука и микширование с микрофоном
def play_and_mix_with_mic(sound_file):
    try:
        # Чтение звука из файла
        data, samplerate = sf.read(sound_file)
        duration = len(data) / samplerate
        
        # Начало записи с микрофона
        mic_audio = sd.rec(int(duration * samplerate), samplerate=samplerate, channels=1, dtype='float32')
        sd.wait()
        
        # Воспроизведение звука через виртуальное устройство
        sd.default.device = (None, device_index)
        sd.play(data + mic_audio, samplerate)
        sd.wait()
        sd.default.device = (None, virtual_device_name)
        sd.play(data + mic_audio, samplerate)
        sd.wait()
    except Exception as e:
        print(f"Ошибка: {e}")

# Привязка горячих клавиш
for key, sound in sound_map.items():
    keyboard.add_hotkey(key, play_and_mix_with_mic, args=(sound,))

print("Нажмите 1 или 2 для воспроизведения звуков. Нажмите 'q' для выхода.")
keyboard.wait('q')
