// C/C++ - grayscale.c
#include <stdint.h>

void grayscaleImage_WASM(uint8_t *data, int length) {
    for (int i = 0; i < length; i += 4) {
        uint8_t avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
}
