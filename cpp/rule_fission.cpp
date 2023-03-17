#include <iostream>
#include <emscripten.h>
using namespace std;

extern "C"
{
    int EMSCRIPTEN_KEEPALIVE add(int a, int b)
    {
        return a + b;
    }
}

int EMSCRIPTEN_KEEPALIVE main()
{
    return 0;
}
