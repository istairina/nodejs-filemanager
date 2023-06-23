import { cd, ls, up } from './nwd/_nwd.js';
import { cat, add, rn, cp, mv, rm } from './files/_files.js';
import { osx } from './os/os.js';
import { hash } from './hash/hash.js';
import { compress, decompress } from './compress/_compress.js'
import { farewell } from './index.js';

export const commands = {
    'up': up,
    'cd': cd,
    'ls': ls,
    'cat': cat,
    'add': add,
    'rn': rn,
    'cp': cp,
    'mv': mv,
    'rm': rm,
    'os': osx,
    'hash': hash,
    'compress': compress,
    'decompress': decompress,
}