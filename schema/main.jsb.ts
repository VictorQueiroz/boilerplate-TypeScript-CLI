import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
import JSBI from "jsbi";
export type FFmpegOriginalFileResult = Readonly<FFmpegOriginalFileResultSuccess> | Readonly<FFmpegOriginalFileResultFailure> | Readonly<FFmpegOriginalFileResultUnknown> | Readonly<FFmpegOriginalFileResultCorrupted>;
export function isFFmpegOriginalFileResultTrait(value: unknown): value is FFmpegOriginalFileResult {
    if(isFFmpegOriginalFileResultSuccess(value)) return true;
    if(isFFmpegOriginalFileResultFailure(value)) return true;
    if(isFFmpegOriginalFileResultUnknown(value)) return true;
    if(isFFmpegOriginalFileResultCorrupted(value)) return true;
    return false;
}
export function encodeFFmpegOriginalFileResultTrait(__s: ISerializer,value: FFmpegOriginalFileResult) {
    switch(value._name) {
        case 'main.FFmpegOriginalFileResultSuccess':
            return encodeFFmpegOriginalFileResultSuccess(__s,value);
        case 'main.FFmpegOriginalFileResultFailure':
            return encodeFFmpegOriginalFileResultFailure(__s,value);
        case 'main.FFmpegOriginalFileResultUnknown':
            return encodeFFmpegOriginalFileResultUnknown(__s,value);
        case 'main.FFmpegOriginalFileResultCorrupted':
            return encodeFFmpegOriginalFileResultCorrupted(__s,value);
    }
    throw new Error(`Failed to encode: Received invalid value on "_name" property. We got "${value['_name']}" value, but this function was expecting to receive one of the following:\n\t- main.FFmpegOriginalFileResultSuccess\n\t- main.FFmpegOriginalFileResultFailure\n\t- main.FFmpegOriginalFileResultUnknown\n\t- main.FFmpegOriginalFileResultCorrupted\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`);
}
export function decodeFFmpegOriginalFileResultTrait(__d: IDeserializer) {
    const __id = __d.readInt32();
    __d.rewind(4);
    let value: FFmpegOriginalFileResultSuccess | FFmpegOriginalFileResultFailure | FFmpegOriginalFileResultUnknown | FFmpegOriginalFileResultCorrupted;
    switch(__id) {
        case -1340213219: {
            const tmp = decodeFFmpegOriginalFileResultSuccess(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        case 265592019: {
            const tmp = decodeFFmpegOriginalFileResultFailure(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        case -1787151053: {
            const tmp = decodeFFmpegOriginalFileResultUnknown(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        case -577838057: {
            const tmp = decodeFFmpegOriginalFileResultCorrupted(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        default: return null;
    }
    return value;
}
export function defaultFFmpegOriginalFileResultTrait() {
    return defaultFFmpegOriginalFileResultSuccess();
}
export function compareFFmpegOriginalFileResultTrait(__a: FFmpegOriginalFileResult, __b: FFmpegOriginalFileResult) {
    switch(__a._name) {
        case 'main.FFmpegOriginalFileResultSuccess':
            if(__b._name !== "main.FFmpegOriginalFileResultSuccess") return false;
            return compareFFmpegOriginalFileResultSuccess(__a,__b);
        case 'main.FFmpegOriginalFileResultFailure':
            if(__b._name !== "main.FFmpegOriginalFileResultFailure") return false;
            return compareFFmpegOriginalFileResultFailure(__a,__b);
        case 'main.FFmpegOriginalFileResultUnknown':
            if(__b._name !== "main.FFmpegOriginalFileResultUnknown") return false;
            return compareFFmpegOriginalFileResultUnknown(__a,__b);
        case 'main.FFmpegOriginalFileResultCorrupted':
            if(__b._name !== "main.FFmpegOriginalFileResultCorrupted") return false;
            return compareFFmpegOriginalFileResultCorrupted(__a,__b);
    }
}
export interface FFmpegOriginalFileResultSuccess  {
    _name: 'main.FFmpegOriginalFileResultSuccess';
    digest: Readonly<FileDigest>;
    originalFile: string;
}
export function isFFmpegOriginalFileResultSuccess(value: unknown): value is FFmpegOriginalFileResultSuccess {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.FFmpegOriginalFileResultSuccess")) return false;
    if(!(
        "digest" in value && ((__v0) => (isFileDigestTrait(__v0)))(value['digest'])
    )) return false;
    if(!(
        "originalFile" in value && ((__v1) => (typeof __v1 === 'string'))(value['originalFile'])
    )) return false;
    return true;
}
export interface FFmpegOriginalFileResultSuccessInputParams {
    digest: Readonly<FileDigest>;
    originalFile: string;
}
export function FFmpegOriginalFileResultSuccess(params: FFmpegOriginalFileResultSuccessInputParams): FFmpegOriginalFileResultSuccess {
    return {
        _name: 'main.FFmpegOriginalFileResultSuccess',
        digest: params['digest'],
        originalFile: params['originalFile']
    };
}
export function encodeFFmpegOriginalFileResultSuccess(__s: ISerializer, value: FFmpegOriginalFileResultSuccess) {
    __s.writeInt32(-1340213219);
    /**
     * encoding param: digest
     */
    const __pv0 = value['digest'];
    encodeFileDigestTrait(__s,__pv0);
    /**
     * encoding param: originalFile
     */
    const __pv1 = value['originalFile'];
    __s.writeString(__pv1);
}
export function decodeFFmpegOriginalFileResultSuccess(__d: IDeserializer): FFmpegOriginalFileResultSuccess | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== -1340213219) return null;
    let digest: FileDigest;
    let originalFile: string;
    /**
     * decoding param: digest
     */
    const __tmp1 = decodeFileDigestTrait(__d);
    if(__tmp1 === null) return null;
    digest = __tmp1;
    /**
     * decoding param: originalFile
     */
    originalFile = __d.readString();
    return {
        _name: 'main.FFmpegOriginalFileResultSuccess',
        digest,
        originalFile
    };
}
export function defaultFFmpegOriginalFileResultSuccess(params: Partial<FFmpegOriginalFileResultSuccessInputParams> = {}): FFmpegOriginalFileResultSuccess {
    return FFmpegOriginalFileResultSuccess({
        digest: defaultFileDigestTrait(),
        originalFile: "",
        ...params
    });
}
export function compareFFmpegOriginalFileResultSuccess(__a: FFmpegOriginalFileResultSuccess, __b: FFmpegOriginalFileResultSuccess): boolean {
    return (
        /**
         * compare parameter digest
         */
        compareFileDigestTrait(__a['digest'],__b['digest']) &&
        /**
         * compare parameter originalFile
         */
        __a['originalFile'] === __b['originalFile']
    );
}
export function updateFFmpegOriginalFileResultSuccess(value: FFmpegOriginalFileResultSuccess, changes: Partial<FFmpegOriginalFileResultSuccessInputParams>) {
    if(typeof changes['digest'] !== 'undefined') {
        if(!(compareFileDigestTrait(changes['digest'],value['digest']))) {
            value = FFmpegOriginalFileResultSuccess({
                ...value,
                digest: changes['digest'],
            });
        }
    }
    if(typeof changes['originalFile'] !== 'undefined') {
        if(!(changes['originalFile'] === value['originalFile'])) {
            value = FFmpegOriginalFileResultSuccess({
                ...value,
                originalFile: changes['originalFile'],
            });
        }
    }
    return value;
}
export interface FFmpegOriginalFileResultFailure  {
    _name: 'main.FFmpegOriginalFileResultFailure';
    digest: Readonly<FileDigest>;
    originalFile: string;
    details: string;
}
export function isFFmpegOriginalFileResultFailure(value: unknown): value is FFmpegOriginalFileResultFailure {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.FFmpegOriginalFileResultFailure")) return false;
    if(!(
        "digest" in value && ((__v0) => (isFileDigestTrait(__v0)))(value['digest'])
    )) return false;
    if(!(
        "originalFile" in value && ((__v1) => (typeof __v1 === 'string'))(value['originalFile'])
    )) return false;
    if(!(
        "details" in value && ((__v2) => (typeof __v2 === 'string'))(value['details'])
    )) return false;
    return true;
}
export interface FFmpegOriginalFileResultFailureInputParams {
    digest: Readonly<FileDigest>;
    originalFile: string;
    details: string;
}
export function FFmpegOriginalFileResultFailure(params: FFmpegOriginalFileResultFailureInputParams): FFmpegOriginalFileResultFailure {
    return {
        _name: 'main.FFmpegOriginalFileResultFailure',
        digest: params['digest'],
        originalFile: params['originalFile'],
        details: params['details']
    };
}
export function encodeFFmpegOriginalFileResultFailure(__s: ISerializer, value: FFmpegOriginalFileResultFailure) {
    __s.writeInt32(265592019);
    /**
     * encoding param: digest
     */
    const __pv0 = value['digest'];
    encodeFileDigestTrait(__s,__pv0);
    /**
     * encoding param: originalFile
     */
    const __pv1 = value['originalFile'];
    __s.writeString(__pv1);
    /**
     * encoding param: details
     */
    const __pv2 = value['details'];
    __s.writeString(__pv2);
}
export function decodeFFmpegOriginalFileResultFailure(__d: IDeserializer): FFmpegOriginalFileResultFailure | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== 265592019) return null;
    let digest: FileDigest;
    let originalFile: string;
    let details: string;
    /**
     * decoding param: digest
     */
    const __tmp1 = decodeFileDigestTrait(__d);
    if(__tmp1 === null) return null;
    digest = __tmp1;
    /**
     * decoding param: originalFile
     */
    originalFile = __d.readString();
    /**
     * decoding param: details
     */
    details = __d.readString();
    return {
        _name: 'main.FFmpegOriginalFileResultFailure',
        digest,
        originalFile,
        details
    };
}
export function defaultFFmpegOriginalFileResultFailure(params: Partial<FFmpegOriginalFileResultFailureInputParams> = {}): FFmpegOriginalFileResultFailure {
    return FFmpegOriginalFileResultFailure({
        digest: defaultFileDigestTrait(),
        originalFile: "",
        details: "",
        ...params
    });
}
export function compareFFmpegOriginalFileResultFailure(__a: FFmpegOriginalFileResultFailure, __b: FFmpegOriginalFileResultFailure): boolean {
    return (
        /**
         * compare parameter digest
         */
        compareFileDigestTrait(__a['digest'],__b['digest']) &&
        /**
         * compare parameter originalFile
         */
        __a['originalFile'] === __b['originalFile'] &&
        /**
         * compare parameter details
         */
        __a['details'] === __b['details']
    );
}
export function updateFFmpegOriginalFileResultFailure(value: FFmpegOriginalFileResultFailure, changes: Partial<FFmpegOriginalFileResultFailureInputParams>) {
    if(typeof changes['digest'] !== 'undefined') {
        if(!(compareFileDigestTrait(changes['digest'],value['digest']))) {
            value = FFmpegOriginalFileResultFailure({
                ...value,
                digest: changes['digest'],
            });
        }
    }
    if(typeof changes['originalFile'] !== 'undefined') {
        if(!(changes['originalFile'] === value['originalFile'])) {
            value = FFmpegOriginalFileResultFailure({
                ...value,
                originalFile: changes['originalFile'],
            });
        }
    }
    if(typeof changes['details'] !== 'undefined') {
        if(!(changes['details'] === value['details'])) {
            value = FFmpegOriginalFileResultFailure({
                ...value,
                details: changes['details'],
            });
        }
    }
    return value;
}
export interface FFmpegOriginalFileResultUnknown  {
    _name: 'main.FFmpegOriginalFileResultUnknown';
    originalFile: string;
}
export function isFFmpegOriginalFileResultUnknown(value: unknown): value is FFmpegOriginalFileResultUnknown {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.FFmpegOriginalFileResultUnknown")) return false;
    if(!(
        "originalFile" in value && ((__v0) => (typeof __v0 === 'string'))(value['originalFile'])
    )) return false;
    return true;
}
export interface FFmpegOriginalFileResultUnknownInputParams {
    originalFile: string;
}
export function FFmpegOriginalFileResultUnknown(params: FFmpegOriginalFileResultUnknownInputParams): FFmpegOriginalFileResultUnknown {
    return {
        _name: 'main.FFmpegOriginalFileResultUnknown',
        originalFile: params['originalFile']
    };
}
export function encodeFFmpegOriginalFileResultUnknown(__s: ISerializer, value: FFmpegOriginalFileResultUnknown) {
    __s.writeInt32(-1787151053);
    /**
     * encoding param: originalFile
     */
    const __pv0 = value['originalFile'];
    __s.writeString(__pv0);
}
export function decodeFFmpegOriginalFileResultUnknown(__d: IDeserializer): FFmpegOriginalFileResultUnknown | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== -1787151053) return null;
    let originalFile: string;
    /**
     * decoding param: originalFile
     */
    originalFile = __d.readString();
    return {
        _name: 'main.FFmpegOriginalFileResultUnknown',
        originalFile
    };
}
export function defaultFFmpegOriginalFileResultUnknown(params: Partial<FFmpegOriginalFileResultUnknownInputParams> = {}): FFmpegOriginalFileResultUnknown {
    return FFmpegOriginalFileResultUnknown({
        originalFile: "",
        ...params
    });
}
export function compareFFmpegOriginalFileResultUnknown(__a: FFmpegOriginalFileResultUnknown, __b: FFmpegOriginalFileResultUnknown): boolean {
    return (
        /**
         * compare parameter originalFile
         */
        __a['originalFile'] === __b['originalFile']
    );
}
export function updateFFmpegOriginalFileResultUnknown(value: FFmpegOriginalFileResultUnknown, changes: Partial<FFmpegOriginalFileResultUnknownInputParams>) {
    if(typeof changes['originalFile'] !== 'undefined') {
        if(!(changes['originalFile'] === value['originalFile'])) {
            value = FFmpegOriginalFileResultUnknown({
                ...value,
                originalFile: changes['originalFile'],
            });
        }
    }
    return value;
}
export interface FFmpegOriginalFileResultCorrupted  {
    _name: 'main.FFmpegOriginalFileResultCorrupted';
}
export function isFFmpegOriginalFileResultCorrupted(value: unknown): value is FFmpegOriginalFileResultCorrupted {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.FFmpegOriginalFileResultCorrupted")) return false;
    return true;
}
export interface FFmpegOriginalFileResultCorruptedInputParams {
}
export function FFmpegOriginalFileResultCorrupted(_: FFmpegOriginalFileResultCorruptedInputParams = {}): FFmpegOriginalFileResultCorrupted {
    return {
        _name: 'main.FFmpegOriginalFileResultCorrupted'
    };
}
export function encodeFFmpegOriginalFileResultCorrupted(__s: ISerializer, _: FFmpegOriginalFileResultCorrupted) {
    __s.writeInt32(-577838057);
}
export function decodeFFmpegOriginalFileResultCorrupted(__d: IDeserializer): FFmpegOriginalFileResultCorrupted | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== -577838057) return null;
    return {
        _name: 'main.FFmpegOriginalFileResultCorrupted',
    };
}
export function defaultFFmpegOriginalFileResultCorrupted(params: Partial<FFmpegOriginalFileResultCorruptedInputParams> = {}): FFmpegOriginalFileResultCorrupted {
    return FFmpegOriginalFileResultCorrupted({
        ...params
    });
}
export function compareFFmpegOriginalFileResultCorrupted(__a: FFmpegOriginalFileResultCorrupted, __b: FFmpegOriginalFileResultCorrupted): boolean {
    return true;
}
export function updateFFmpegOriginalFileResultCorrupted(value: FFmpegOriginalFileResultCorrupted, _: Partial<FFmpegOriginalFileResultCorruptedInputParams>) {
    return value;
}
export type FFmpegEncodedFileResult = Readonly<FFmpegEncodedFileResultSuccess> | Readonly<FFmpegEncodedFileResultFailure> | Readonly<FFmpegEncodedFileResultCorrupted>;
export function isFFmpegEncodedFileResultTrait(value: unknown): value is FFmpegEncodedFileResult {
    if(isFFmpegEncodedFileResultSuccess(value)) return true;
    if(isFFmpegEncodedFileResultFailure(value)) return true;
    if(isFFmpegEncodedFileResultCorrupted(value)) return true;
    return false;
}
export function encodeFFmpegEncodedFileResultTrait(__s: ISerializer,value: FFmpegEncodedFileResult) {
    switch(value._name) {
        case 'main.FFmpegEncodedFileResultSuccess':
            return encodeFFmpegEncodedFileResultSuccess(__s,value);
        case 'main.FFmpegEncodedFileResultFailure':
            return encodeFFmpegEncodedFileResultFailure(__s,value);
        case 'main.FFmpegEncodedFileResultCorrupted':
            return encodeFFmpegEncodedFileResultCorrupted(__s,value);
    }
    throw new Error(`Failed to encode: Received invalid value on "_name" property. We got "${value['_name']}" value, but this function was expecting to receive one of the following:\n\t- main.FFmpegEncodedFileResultSuccess\n\t- main.FFmpegEncodedFileResultFailure\n\t- main.FFmpegEncodedFileResultCorrupted\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`);
}
export function decodeFFmpegEncodedFileResultTrait(__d: IDeserializer) {
    const __id = __d.readInt32();
    __d.rewind(4);
    let value: FFmpegEncodedFileResultSuccess | FFmpegEncodedFileResultFailure | FFmpegEncodedFileResultCorrupted;
    switch(__id) {
        case 1056903997: {
            const tmp = decodeFFmpegEncodedFileResultSuccess(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        case -350724684: {
            const tmp = decodeFFmpegEncodedFileResultFailure(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        case -188707955: {
            const tmp = decodeFFmpegEncodedFileResultCorrupted(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        default: return null;
    }
    return value;
}
export function defaultFFmpegEncodedFileResultTrait() {
    return defaultFFmpegEncodedFileResultSuccess();
}
export function compareFFmpegEncodedFileResultTrait(__a: FFmpegEncodedFileResult, __b: FFmpegEncodedFileResult) {
    switch(__a._name) {
        case 'main.FFmpegEncodedFileResultSuccess':
            if(__b._name !== "main.FFmpegEncodedFileResultSuccess") return false;
            return compareFFmpegEncodedFileResultSuccess(__a,__b);
        case 'main.FFmpegEncodedFileResultFailure':
            if(__b._name !== "main.FFmpegEncodedFileResultFailure") return false;
            return compareFFmpegEncodedFileResultFailure(__a,__b);
        case 'main.FFmpegEncodedFileResultCorrupted':
            if(__b._name !== "main.FFmpegEncodedFileResultCorrupted") return false;
            return compareFFmpegEncodedFileResultCorrupted(__a,__b);
    }
}
export type AudioCodec = Readonly<AudioCodecOpus>;
export function isAudioCodecTrait(value: unknown): value is AudioCodec {
    if(isAudioCodecOpus(value)) return true;
    return false;
}
export function encodeAudioCodecTrait(__s: ISerializer,value: AudioCodec) {
    switch(value._name) {
        case 'main.AudioCodecOpus':
            return encodeAudioCodecOpus(__s,value);
    }
    throw new Error(`Failed to encode: Received invalid value on "_name" property. We got "${value['_name']}" value, but this function was expecting to receive one of the following:\n\t- main.AudioCodecOpus\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`);
}
export function decodeAudioCodecTrait(__d: IDeserializer) {
    const __id = __d.readInt32();
    __d.rewind(4);
    let value: AudioCodecOpus;
    switch(__id) {
        case -110698646: {
            const tmp = decodeAudioCodecOpus(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        default: return null;
    }
    return value;
}
export function defaultAudioCodecTrait() {
    return defaultAudioCodecOpus();
}
export function compareAudioCodecTrait(__a: AudioCodec, __b: AudioCodec) {
    return compareAudioCodecOpus(__a, __b);
}
export interface AudioCodecOpus  {
    _name: 'main.AudioCodecOpus';
}
export function isAudioCodecOpus(value: unknown): value is AudioCodecOpus {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.AudioCodecOpus")) return false;
    return true;
}
export interface AudioCodecOpusInputParams {
}
export function AudioCodecOpus(_: AudioCodecOpusInputParams = {}): AudioCodecOpus {
    return {
        _name: 'main.AudioCodecOpus'
    };
}
export function encodeAudioCodecOpus(__s: ISerializer, _: AudioCodecOpus) {
    __s.writeInt32(-110698646);
}
export function decodeAudioCodecOpus(__d: IDeserializer): AudioCodecOpus | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== -110698646) return null;
    return {
        _name: 'main.AudioCodecOpus',
    };
}
export function defaultAudioCodecOpus(params: Partial<AudioCodecOpusInputParams> = {}): AudioCodecOpus {
    return AudioCodecOpus({
        ...params
    });
}
export function compareAudioCodecOpus(__a: AudioCodecOpus, __b: AudioCodecOpus): boolean {
    return true;
}
export function updateAudioCodecOpus(value: AudioCodecOpus, _: Partial<AudioCodecOpusInputParams>) {
    return value;
}
export interface FFmpegEncodedFileResultSuccess  {
    _name: 'main.FFmpegEncodedFileResultSuccess';
    origin: Readonly<FFmpegOriginalFileResult>;
    outputFile: string;
    bitrate: string;
    sampleRate: number;
    channelCount: number;
    audioCodec: Readonly<AudioCodec>;
}
export function isFFmpegEncodedFileResultSuccess(value: unknown): value is FFmpegEncodedFileResultSuccess {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.FFmpegEncodedFileResultSuccess")) return false;
    if(!(
        "origin" in value && ((__v0) => (isFFmpegOriginalFileResultTrait(__v0)))(value['origin'])
    )) return false;
    if(!(
        "outputFile" in value && ((__v1) => (typeof __v1 === 'string'))(value['outputFile'])
    )) return false;
    if(!(
        "bitrate" in value && ((__v2) => (typeof __v2 === 'string'))(value['bitrate'])
    )) return false;
    if(!(
        "sampleRate" in value && ((__v3) => (typeof __v3 === 'number' && JSBI.equal(JSBI.BigInt(__v3),JSBI.BigInt(__v3)) && JSBI.greaterThanOrEqual(JSBI.BigInt(__v3),JSBI.BigInt("-2147483648")) && JSBI.lessThanOrEqual(JSBI.BigInt(__v3),JSBI.BigInt("2147483647"))))(value['sampleRate'])
    )) return false;
    if(!(
        "channelCount" in value && ((__v4) => (typeof __v4 === 'number' && JSBI.equal(JSBI.BigInt(__v4),JSBI.BigInt(__v4)) && JSBI.greaterThanOrEqual(JSBI.BigInt(__v4),JSBI.BigInt("-2147483648")) && JSBI.lessThanOrEqual(JSBI.BigInt(__v4),JSBI.BigInt("2147483647"))))(value['channelCount'])
    )) return false;
    if(!(
        "audioCodec" in value && ((__v5) => (isAudioCodecTrait(__v5)))(value['audioCodec'])
    )) return false;
    return true;
}
export interface FFmpegEncodedFileResultSuccessInputParams {
    origin: Readonly<FFmpegOriginalFileResult>;
    outputFile: string;
    bitrate: string;
    sampleRate: number;
    channelCount: number;
    audioCodec: Readonly<AudioCodec>;
}
export function FFmpegEncodedFileResultSuccess(params: FFmpegEncodedFileResultSuccessInputParams): FFmpegEncodedFileResultSuccess {
    return {
        _name: 'main.FFmpegEncodedFileResultSuccess',
        origin: params['origin'],
        outputFile: params['outputFile'],
        bitrate: params['bitrate'],
        sampleRate: params['sampleRate'],
        channelCount: params['channelCount'],
        audioCodec: params['audioCodec']
    };
}
export function encodeFFmpegEncodedFileResultSuccess(__s: ISerializer, value: FFmpegEncodedFileResultSuccess) {
    __s.writeInt32(1056903997);
    /**
     * encoding param: origin
     */
    const __pv0 = value['origin'];
    encodeFFmpegOriginalFileResultTrait(__s,__pv0);
    /**
     * encoding param: outputFile
     */
    const __pv1 = value['outputFile'];
    __s.writeString(__pv1);
    /**
     * encoding param: bitrate
     */
    const __pv2 = value['bitrate'];
    __s.writeString(__pv2);
    /**
     * encoding param: sampleRate
     */
    const __pv3 = value['sampleRate'];
    __s.writeInt32(__pv3);
    /**
     * encoding param: channelCount
     */
    const __pv4 = value['channelCount'];
    __s.writeInt32(__pv4);
    /**
     * encoding param: audioCodec
     */
    const __pv5 = value['audioCodec'];
    encodeAudioCodecTrait(__s,__pv5);
}
export function decodeFFmpegEncodedFileResultSuccess(__d: IDeserializer): FFmpegEncodedFileResultSuccess | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== 1056903997) return null;
    let origin: FFmpegOriginalFileResult;
    let outputFile: string;
    let bitrate: string;
    let sampleRate: number;
    let channelCount: number;
    let audioCodec: AudioCodec;
    /**
     * decoding param: origin
     */
    const __tmp1 = decodeFFmpegOriginalFileResultTrait(__d);
    if(__tmp1 === null) return null;
    origin = __tmp1;
    /**
     * decoding param: outputFile
     */
    outputFile = __d.readString();
    /**
     * decoding param: bitrate
     */
    bitrate = __d.readString();
    /**
     * decoding param: sampleRate
     */
    sampleRate = __d.readInt32();
    /**
     * decoding param: channelCount
     */
    channelCount = __d.readInt32();
    /**
     * decoding param: audioCodec
     */
    const __tmp6 = decodeAudioCodecTrait(__d);
    if(__tmp6 === null) return null;
    audioCodec = __tmp6;
    return {
        _name: 'main.FFmpegEncodedFileResultSuccess',
        origin,
        outputFile,
        bitrate,
        sampleRate,
        channelCount,
        audioCodec
    };
}
export function defaultFFmpegEncodedFileResultSuccess(params: Partial<FFmpegEncodedFileResultSuccessInputParams> = {}): FFmpegEncodedFileResultSuccess {
    return FFmpegEncodedFileResultSuccess({
        origin: defaultFFmpegOriginalFileResultTrait(),
        outputFile: "",
        bitrate: "",
        sampleRate: 0,
        channelCount: 0,
        audioCodec: defaultAudioCodecTrait(),
        ...params
    });
}
export function compareFFmpegEncodedFileResultSuccess(__a: FFmpegEncodedFileResultSuccess, __b: FFmpegEncodedFileResultSuccess): boolean {
    return (
        /**
         * compare parameter origin
         */
        compareFFmpegOriginalFileResultTrait(__a['origin'],__b['origin']) &&
        /**
         * compare parameter outputFile
         */
        __a['outputFile'] === __b['outputFile'] &&
        /**
         * compare parameter bitrate
         */
        __a['bitrate'] === __b['bitrate'] &&
        /**
         * compare parameter sampleRate
         */
        __a['sampleRate'] === __b['sampleRate'] &&
        /**
         * compare parameter channelCount
         */
        __a['channelCount'] === __b['channelCount'] &&
        /**
         * compare parameter audioCodec
         */
        compareAudioCodecTrait(__a['audioCodec'],__b['audioCodec'])
    );
}
export function updateFFmpegEncodedFileResultSuccess(value: FFmpegEncodedFileResultSuccess, changes: Partial<FFmpegEncodedFileResultSuccessInputParams>) {
    if(typeof changes['origin'] !== 'undefined') {
        if(!(compareFFmpegOriginalFileResultTrait(changes['origin'],value['origin']))) {
            value = FFmpegEncodedFileResultSuccess({
                ...value,
                origin: changes['origin'],
            });
        }
    }
    if(typeof changes['outputFile'] !== 'undefined') {
        if(!(changes['outputFile'] === value['outputFile'])) {
            value = FFmpegEncodedFileResultSuccess({
                ...value,
                outputFile: changes['outputFile'],
            });
        }
    }
    if(typeof changes['bitrate'] !== 'undefined') {
        if(!(changes['bitrate'] === value['bitrate'])) {
            value = FFmpegEncodedFileResultSuccess({
                ...value,
                bitrate: changes['bitrate'],
            });
        }
    }
    if(typeof changes['sampleRate'] !== 'undefined') {
        if(!(changes['sampleRate'] === value['sampleRate'])) {
            value = FFmpegEncodedFileResultSuccess({
                ...value,
                sampleRate: changes['sampleRate'],
            });
        }
    }
    if(typeof changes['channelCount'] !== 'undefined') {
        if(!(changes['channelCount'] === value['channelCount'])) {
            value = FFmpegEncodedFileResultSuccess({
                ...value,
                channelCount: changes['channelCount'],
            });
        }
    }
    if(typeof changes['audioCodec'] !== 'undefined') {
        if(!(compareAudioCodecTrait(changes['audioCodec'],value['audioCodec']))) {
            value = FFmpegEncodedFileResultSuccess({
                ...value,
                audioCodec: changes['audioCodec'],
            });
        }
    }
    return value;
}
export interface FFmpegEncodedFileResultFailure  {
    _name: 'main.FFmpegEncodedFileResultFailure';
    origin: Readonly<FFmpegOriginalFileResult>;
    details: string;
}
export function isFFmpegEncodedFileResultFailure(value: unknown): value is FFmpegEncodedFileResultFailure {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.FFmpegEncodedFileResultFailure")) return false;
    if(!(
        "origin" in value && ((__v0) => (isFFmpegOriginalFileResultTrait(__v0)))(value['origin'])
    )) return false;
    if(!(
        "details" in value && ((__v1) => (typeof __v1 === 'string'))(value['details'])
    )) return false;
    return true;
}
export interface FFmpegEncodedFileResultFailureInputParams {
    origin: Readonly<FFmpegOriginalFileResult>;
    details: string;
}
export function FFmpegEncodedFileResultFailure(params: FFmpegEncodedFileResultFailureInputParams): FFmpegEncodedFileResultFailure {
    return {
        _name: 'main.FFmpegEncodedFileResultFailure',
        origin: params['origin'],
        details: params['details']
    };
}
export function encodeFFmpegEncodedFileResultFailure(__s: ISerializer, value: FFmpegEncodedFileResultFailure) {
    __s.writeInt32(-350724684);
    /**
     * encoding param: origin
     */
    const __pv0 = value['origin'];
    encodeFFmpegOriginalFileResultTrait(__s,__pv0);
    /**
     * encoding param: details
     */
    const __pv1 = value['details'];
    __s.writeString(__pv1);
}
export function decodeFFmpegEncodedFileResultFailure(__d: IDeserializer): FFmpegEncodedFileResultFailure | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== -350724684) return null;
    let origin: FFmpegOriginalFileResult;
    let details: string;
    /**
     * decoding param: origin
     */
    const __tmp1 = decodeFFmpegOriginalFileResultTrait(__d);
    if(__tmp1 === null) return null;
    origin = __tmp1;
    /**
     * decoding param: details
     */
    details = __d.readString();
    return {
        _name: 'main.FFmpegEncodedFileResultFailure',
        origin,
        details
    };
}
export function defaultFFmpegEncodedFileResultFailure(params: Partial<FFmpegEncodedFileResultFailureInputParams> = {}): FFmpegEncodedFileResultFailure {
    return FFmpegEncodedFileResultFailure({
        origin: defaultFFmpegOriginalFileResultTrait(),
        details: "",
        ...params
    });
}
export function compareFFmpegEncodedFileResultFailure(__a: FFmpegEncodedFileResultFailure, __b: FFmpegEncodedFileResultFailure): boolean {
    return (
        /**
         * compare parameter origin
         */
        compareFFmpegOriginalFileResultTrait(__a['origin'],__b['origin']) &&
        /**
         * compare parameter details
         */
        __a['details'] === __b['details']
    );
}
export function updateFFmpegEncodedFileResultFailure(value: FFmpegEncodedFileResultFailure, changes: Partial<FFmpegEncodedFileResultFailureInputParams>) {
    if(typeof changes['origin'] !== 'undefined') {
        if(!(compareFFmpegOriginalFileResultTrait(changes['origin'],value['origin']))) {
            value = FFmpegEncodedFileResultFailure({
                ...value,
                origin: changes['origin'],
            });
        }
    }
    if(typeof changes['details'] !== 'undefined') {
        if(!(changes['details'] === value['details'])) {
            value = FFmpegEncodedFileResultFailure({
                ...value,
                details: changes['details'],
            });
        }
    }
    return value;
}
export interface FFmpegEncodedFileResultCorrupted  {
    _name: 'main.FFmpegEncodedFileResultCorrupted';
}
export function isFFmpegEncodedFileResultCorrupted(value: unknown): value is FFmpegEncodedFileResultCorrupted {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.FFmpegEncodedFileResultCorrupted")) return false;
    return true;
}
export interface FFmpegEncodedFileResultCorruptedInputParams {
}
export function FFmpegEncodedFileResultCorrupted(_: FFmpegEncodedFileResultCorruptedInputParams = {}): FFmpegEncodedFileResultCorrupted {
    return {
        _name: 'main.FFmpegEncodedFileResultCorrupted'
    };
}
export function encodeFFmpegEncodedFileResultCorrupted(__s: ISerializer, _: FFmpegEncodedFileResultCorrupted) {
    __s.writeInt32(-188707955);
}
export function decodeFFmpegEncodedFileResultCorrupted(__d: IDeserializer): FFmpegEncodedFileResultCorrupted | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== -188707955) return null;
    return {
        _name: 'main.FFmpegEncodedFileResultCorrupted',
    };
}
export function defaultFFmpegEncodedFileResultCorrupted(params: Partial<FFmpegEncodedFileResultCorruptedInputParams> = {}): FFmpegEncodedFileResultCorrupted {
    return FFmpegEncodedFileResultCorrupted({
        ...params
    });
}
export function compareFFmpegEncodedFileResultCorrupted(__a: FFmpegEncodedFileResultCorrupted, __b: FFmpegEncodedFileResultCorrupted): boolean {
    return true;
}
export function updateFFmpegEncodedFileResultCorrupted(value: FFmpegEncodedFileResultCorrupted, _: Partial<FFmpegEncodedFileResultCorruptedInputParams>) {
    return value;
}
export type FileDigest = Readonly<FileDigestSHA1>;
export function isFileDigestTrait(value: unknown): value is FileDigest {
    if(isFileDigestSHA1(value)) return true;
    return false;
}
export function encodeFileDigestTrait(__s: ISerializer,value: FileDigest) {
    switch(value._name) {
        case 'main.FileDigestSHA1':
            return encodeFileDigestSHA1(__s,value);
    }
    throw new Error(`Failed to encode: Received invalid value on "_name" property. We got "${value['_name']}" value, but this function was expecting to receive one of the following:\n\t- main.FileDigestSHA1\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`);
}
export function decodeFileDigestTrait(__d: IDeserializer) {
    const __id = __d.readInt32();
    __d.rewind(4);
    let value: FileDigestSHA1;
    switch(__id) {
        case -2079332690: {
            const tmp = decodeFileDigestSHA1(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        default: return null;
    }
    return value;
}
export function defaultFileDigestTrait() {
    return defaultFileDigestSHA1();
}
export function compareFileDigestTrait(__a: FileDigest, __b: FileDigest) {
    return compareFileDigestSHA1(__a, __b);
}
export interface FileDigestSHA1  {
    _name: 'main.FileDigestSHA1';
    value: string;
}
export function isFileDigestSHA1(value: unknown): value is FileDigestSHA1 {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.FileDigestSHA1")) return false;
    if(!(
        "value" in value && ((__v0) => (typeof __v0 === 'string'))(value['value'])
    )) return false;
    return true;
}
export interface FileDigestSHA1InputParams {
    value: string;
}
export function FileDigestSHA1(params: FileDigestSHA1InputParams): FileDigestSHA1 {
    return {
        _name: 'main.FileDigestSHA1',
        value: params['value']
    };
}
export function encodeFileDigestSHA1(__s: ISerializer, value: FileDigestSHA1) {
    __s.writeInt32(-2079332690);
    /**
     * encoding param: value
     */
    const __pv0 = value['value'];
    __s.writeString(__pv0);
}
export function decodeFileDigestSHA1(__d: IDeserializer): FileDigestSHA1 | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== -2079332690) return null;
    let value: string;
    /**
     * decoding param: value
     */
    value = __d.readString();
    return {
        _name: 'main.FileDigestSHA1',
        value
    };
}
export function defaultFileDigestSHA1(params: Partial<FileDigestSHA1InputParams> = {}): FileDigestSHA1 {
    return FileDigestSHA1({
        value: "",
        ...params
    });
}
export function compareFileDigestSHA1(__a: FileDigestSHA1, __b: FileDigestSHA1): boolean {
    return (
        /**
         * compare parameter value
         */
        __a['value'] === __b['value']
    );
}
export function updateFileDigestSHA1(value: FileDigestSHA1, changes: Partial<FileDigestSHA1InputParams>) {
    if(typeof changes['value'] !== 'undefined') {
        if(!(changes['value'] === value['value'])) {
            value = FileDigestSHA1({
                ...value,
                value: changes['value'],
            });
        }
    }
    return value;
}
