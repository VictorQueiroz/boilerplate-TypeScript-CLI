import JSBI from "jsbi";
import { ISerializer } from "./__types__";
import { IDeserializer } from "./__types__";
export interface IPReadingInformation  {
    _name: 'main.IPReadingInformation';
    byteOffset: number;
    lastTarget: Readonly<TestURL> | null;
}
export function isIPReadingInformation(value: unknown): value is IPReadingInformation {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.IPReadingInformation")) return false;
    if(!(
        "byteOffset" in value && ((__v0) => (typeof __v0 === 'number' && JSBI.equal(JSBI.BigInt(__v0),JSBI.BigInt(__v0)) && JSBI.greaterThanOrEqual(JSBI.BigInt(__v0),JSBI.BigInt("0")) && JSBI.lessThanOrEqual(JSBI.BigInt(__v0),JSBI.BigInt("4294967295"))))(value['byteOffset'])
    )) return false;
    if(!(
        "lastTarget" in value && ((__v1) => (__v1 === null ? true : ((x) => (isTestURL(x)))(__v1)))(value['lastTarget'])
    )) return false;
    return true;
}
export interface IPReadingInformationInputParams {
    byteOffset: number;
    lastTarget: Readonly<TestURL> | null;
}
export function IPReadingInformation(params: IPReadingInformationInputParams): IPReadingInformation {
    return {
        _name: 'main.IPReadingInformation',
        byteOffset: params['byteOffset'],
        lastTarget: params['lastTarget']
    };
}
export function encodeIPReadingInformation(__s: ISerializer, value: IPReadingInformation) {
    __s.writeInt32(1632794263);
    /**
     * encoding param: byteOffset
     */
    const __pv0 = value['byteOffset'];
    __s.writeUint32(__pv0);
    /**
     * encoding param: lastTarget
     */
    const __pv1 = value['lastTarget'];
    if(__pv1 === null) {
        __s.writeUint8(0);
    } else {
        __s.writeUint8(1);
        encodeTestURL(__s,__pv1);
    }
}
export function decodeIPReadingInformation(__d: IDeserializer): IPReadingInformation | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== 1632794263) return null;
    let byteOffset: number;
    let lastTarget: TestURL | null;
    /**
     * decoding param: byteOffset
     */
    byteOffset = __d.readUint32();
    /**
     * decoding param: lastTarget
     */
    if(__d.readUint8() === 1) {
        const __tmp3 = decodeTestURL(__d);
        if(__tmp3 === null) return null;
        lastTarget = __tmp3;
    } else {
        lastTarget = null;
    }
    return {
        _name: 'main.IPReadingInformation',
        byteOffset,
        lastTarget
    };
}
export function defaultIPReadingInformation(params: Partial<IPReadingInformationInputParams> = {}): IPReadingInformation {
    return IPReadingInformation({
        byteOffset: 0,
        lastTarget: null,
        ...params
    });
}
export function compareIPReadingInformation(__a: IPReadingInformation, __b: IPReadingInformation): boolean {
    return (
        /**
         * compare parameter byteOffset
         */
        __a['byteOffset'] === __b['byteOffset'] &&
        /**
         * compare parameter lastTarget
         */
        ((__dp11, __dp12) => __dp11 !== null && __dp12 !== null ? compareTestURL(__dp11,__dp12) : __dp11 === __dp12)(__a['lastTarget'],__b['lastTarget'])
    );
}
export function updateIPReadingInformation(value: IPReadingInformation, changes: Partial<IPReadingInformationInputParams>) {
    if(typeof changes['byteOffset'] !== 'undefined') {
        if(!(changes['byteOffset'] === value['byteOffset'])) {
            value = IPReadingInformation({
                ...value,
                byteOffset: changes['byteOffset'],
            });
        }
    }
    if(typeof changes['lastTarget'] !== 'undefined') {
        if(!(((__dp21, __dp22) => __dp21 !== null && __dp22 !== null ? compareTestURL(__dp21,__dp22) : __dp21 === __dp22)(changes['lastTarget'],value['lastTarget']))) {
            value = IPReadingInformation({
                ...value,
                lastTarget: changes['lastTarget'],
            });
        }
    }
    return value;
}
export type IPTestingResult = Readonly<IPTestingResultSuccess> | Readonly<IPTestingResultFailure>;
export function isIPTestingResultTrait(value: unknown): value is IPTestingResult {
    if(isIPTestingResultSuccess(value)) return true;
    if(isIPTestingResultFailure(value)) return true;
    return false;
}
export function encodeIPTestingResultTrait(__s: ISerializer,value: IPTestingResult) {
    switch(value._name) {
        case 'main.IPTestingResultSuccess':
            return encodeIPTestingResultSuccess(__s,value);
        case 'main.IPTestingResultFailure':
            return encodeIPTestingResultFailure(__s,value);
    }
    throw new Error(`Failed to encode: Received invalid value on "_name" property. We got "${value['_name']}" value, but this function was expecting to receive one of the following:\n\t- main.IPTestingResultSuccess\n\t- main.IPTestingResultFailure\n\n\nPossible cause is that maybe this type simply does not extend this trait, and somehow the type-checking prevented you from calling this function wrongly.`);
}
export function decodeIPTestingResultTrait(__d: IDeserializer) {
    const __id = __d.readInt32();
    __d.rewind(4);
    let value: IPTestingResultSuccess | IPTestingResultFailure;
    switch(__id) {
        case 1167151156: {
            const tmp = decodeIPTestingResultSuccess(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        case -154464973: {
            const tmp = decodeIPTestingResultFailure(__d);
            if(tmp === null) return null;
            value = tmp;
            break;
        }
        default: return null;
    }
    return value;
}
export function defaultIPTestingResultTrait() {
    return defaultIPTestingResultSuccess();
}
export function compareIPTestingResultTrait(__a: IPTestingResult, __b: IPTestingResult) {
    switch(__a._name) {
        case 'main.IPTestingResultSuccess':
            if(__b._name !== "main.IPTestingResultSuccess") return false;
            return compareIPTestingResultSuccess(__a,__b);
        case 'main.IPTestingResultFailure':
            if(__b._name !== "main.IPTestingResultFailure") return false;
            return compareIPTestingResultFailure(__a,__b);
    }
}
export interface IPTestingResultSuccess  {
    _name: 'main.IPTestingResultSuccess';
    result: Readonly<IPHttpResult>;
}
export function isIPTestingResultSuccess(value: unknown): value is IPTestingResultSuccess {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.IPTestingResultSuccess")) return false;
    if(!(
        "result" in value && ((__v0) => (isIPHttpResult(__v0)))(value['result'])
    )) return false;
    return true;
}
export interface IPTestingResultSuccessInputParams {
    result: Readonly<IPHttpResult>;
}
export function IPTestingResultSuccess(params: IPTestingResultSuccessInputParams): IPTestingResultSuccess {
    return {
        _name: 'main.IPTestingResultSuccess',
        result: params['result']
    };
}
export function encodeIPTestingResultSuccess(__s: ISerializer, value: IPTestingResultSuccess) {
    __s.writeInt32(1167151156);
    /**
     * encoding param: result
     */
    const __pv0 = value['result'];
    encodeIPHttpResult(__s,__pv0);
}
export function decodeIPTestingResultSuccess(__d: IDeserializer): IPTestingResultSuccess | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== 1167151156) return null;
    let result: IPHttpResult;
    /**
     * decoding param: result
     */
    const __tmp1 = decodeIPHttpResult(__d);
    if(__tmp1 === null) return null;
    result = __tmp1;
    return {
        _name: 'main.IPTestingResultSuccess',
        result
    };
}
export function defaultIPTestingResultSuccess(params: Partial<IPTestingResultSuccessInputParams> = {}): IPTestingResultSuccess {
    return IPTestingResultSuccess({
        result: defaultIPHttpResult(),
        ...params
    });
}
export function compareIPTestingResultSuccess(__a: IPTestingResultSuccess, __b: IPTestingResultSuccess): boolean {
    return (
        /**
         * compare parameter result
         */
        compareIPHttpResult(__a['result'],__b['result'])
    );
}
export function updateIPTestingResultSuccess(value: IPTestingResultSuccess, changes: Partial<IPTestingResultSuccessInputParams>) {
    if(typeof changes['result'] !== 'undefined') {
        if(!(compareIPHttpResult(changes['result'],value['result']))) {
            value = IPTestingResultSuccess({
                ...value,
                result: changes['result'],
            });
        }
    }
    return value;
}
export interface ProcessedExtractionTargetFileMetadata  {
    _name: 'main.ProcessedExtractionTargetFileMetadata';
    attributes: ReadonlyArray<Readonly<Attribute>>;
}
export function isProcessedExtractionTargetFileMetadata(value: unknown): value is ProcessedExtractionTargetFileMetadata {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.ProcessedExtractionTargetFileMetadata")) return false;
    if(!(
        "attributes" in value && ((__v0) => ((Array.isArray(__v0) || __v0 instanceof Set) && Array.from(__v0).every(p => (isAttribute(p)))))(value['attributes'])
    )) return false;
    return true;
}
export interface ProcessedExtractionTargetFileMetadataInputParams {
    attributes: ReadonlyArray<Readonly<Attribute>>;
}
export function ProcessedExtractionTargetFileMetadata(params: ProcessedExtractionTargetFileMetadataInputParams): ProcessedExtractionTargetFileMetadata {
    return {
        _name: 'main.ProcessedExtractionTargetFileMetadata',
        attributes: params['attributes']
    };
}
export function encodeProcessedExtractionTargetFileMetadata(__s: ISerializer, value: ProcessedExtractionTargetFileMetadata) {
    __s.writeInt32(-445826394);
    /**
     * encoding param: attributes
     */
    const __pv0 = value['attributes'];
    const __l1 = __pv0.length;
    __s.writeUint32(__l1);
    for(const __item1 of __pv0) {
        encodeAttribute(__s,__item1);
    }
}
export function decodeProcessedExtractionTargetFileMetadata(__d: IDeserializer): ProcessedExtractionTargetFileMetadata | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== -445826394) return null;
    let attributes: Array<Attribute>;
    /**
     * decoding param: attributes
     */
    const __l1 = __d.readUint32();
    const __o1 = new Array<Attribute>(__l1);
    attributes = __o1;
    for(let __i1 = 0; __i1 < __l1; __i1++) {
        const __tmp2 = decodeAttribute(__d);
        if(__tmp2 === null) return null;
        __o1[__i1] = __tmp2;
    }
    return {
        _name: 'main.ProcessedExtractionTargetFileMetadata',
        attributes
    };
}
export function defaultProcessedExtractionTargetFileMetadata(params: Partial<ProcessedExtractionTargetFileMetadataInputParams> = {}): ProcessedExtractionTargetFileMetadata {
    return ProcessedExtractionTargetFileMetadata({
        attributes: [],
        ...params
    });
}
export function compareProcessedExtractionTargetFileMetadata(__a: ProcessedExtractionTargetFileMetadata, __b: ProcessedExtractionTargetFileMetadata): boolean {
    return (
        /**
         * compare parameter attributes
         */
        __a['attributes'].length === __b['attributes'].length && Array.from(__a['attributes']).every((__originalItem0,__index0) => (typeof __originalItem0 === 'undefined' ? false : (__item0 => typeof __item0 === 'undefined' ? false : (compareAttribute(__originalItem0,__item0)))(Array.from(__b['attributes'])[__index0])))
    );
}
export function updateProcessedExtractionTargetFileMetadata(value: ProcessedExtractionTargetFileMetadata, changes: Partial<ProcessedExtractionTargetFileMetadataInputParams>) {
    if(typeof changes['attributes'] !== 'undefined') {
        if(!(changes['attributes'].length === value['attributes'].length && Array.from(changes['attributes']).every((__originalItem1,__index1) => (typeof __originalItem1 === 'undefined' ? false : (__item1 => typeof __item1 === 'undefined' ? false : (compareAttribute(__originalItem1,__item1)))(Array.from(value['attributes'])[__index1]))))) {
            value = ProcessedExtractionTargetFileMetadata({
                ...value,
                attributes: changes['attributes'],
            });
        }
    }
    return value;
}
export interface Attribute  {
    _name: 'main.Attribute';
    name: string;
    value: string;
}
export function isAttribute(value: unknown): value is Attribute {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.Attribute")) return false;
    if(!(
        "name" in value && ((__v0) => (typeof __v0 === 'string'))(value['name'])
    )) return false;
    if(!(
        "value" in value && ((__v1) => (typeof __v1 === 'string'))(value['value'])
    )) return false;
    return true;
}
export interface AttributeInputParams {
    name: string;
    value: string;
}
export function Attribute(params: AttributeInputParams): Attribute {
    return {
        _name: 'main.Attribute',
        name: params['name'],
        value: params['value']
    };
}
export function encodeAttribute(__s: ISerializer, value: Attribute) {
    __s.writeInt32(1048614269);
    /**
     * encoding param: name
     */
    const __pv0 = value['name'];
    __s.writeString(__pv0);
    /**
     * encoding param: value
     */
    const __pv1 = value['value'];
    __s.writeString(__pv1);
}
export function decodeAttribute(__d: IDeserializer): Attribute | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== 1048614269) return null;
    let name: string;
    let value: string;
    /**
     * decoding param: name
     */
    name = __d.readString();
    /**
     * decoding param: value
     */
    value = __d.readString();
    return {
        _name: 'main.Attribute',
        name,
        value
    };
}
export function defaultAttribute(params: Partial<AttributeInputParams> = {}): Attribute {
    return Attribute({
        name: "",
        value: "",
        ...params
    });
}
export function compareAttribute(__a: Attribute, __b: Attribute): boolean {
    return (
        /**
         * compare parameter name
         */
        __a['name'] === __b['name'] &&
        /**
         * compare parameter value
         */
        __a['value'] === __b['value']
    );
}
export function updateAttribute(value: Attribute, changes: Partial<AttributeInputParams>) {
    if(typeof changes['name'] !== 'undefined') {
        if(!(changes['name'] === value['name'])) {
            value = Attribute({
                ...value,
                name: changes['name'],
            });
        }
    }
    if(typeof changes['value'] !== 'undefined') {
        if(!(changes['value'] === value['value'])) {
            value = Attribute({
                ...value,
                value: changes['value'],
            });
        }
    }
    return value;
}
export interface ProcessedExtractionTargetFile  {
    _name: 'main.ProcessedExtractionTargetFile';
    file: Readonly<FileLocation>;
    metadata: Readonly<ProcessedExtractionTargetFileMetadata>;
}
export function isProcessedExtractionTargetFile(value: unknown): value is ProcessedExtractionTargetFile {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.ProcessedExtractionTargetFile")) return false;
    if(!(
        "file" in value && ((__v0) => (isFileLocation(__v0)))(value['file'])
    )) return false;
    if(!(
        "metadata" in value && ((__v1) => (isProcessedExtractionTargetFileMetadata(__v1)))(value['metadata'])
    )) return false;
    return true;
}
export interface ProcessedExtractionTargetFileInputParams {
    file: Readonly<FileLocation>;
    metadata: Readonly<ProcessedExtractionTargetFileMetadata>;
}
export function ProcessedExtractionTargetFile(params: ProcessedExtractionTargetFileInputParams): ProcessedExtractionTargetFile {
    return {
        _name: 'main.ProcessedExtractionTargetFile',
        file: params['file'],
        metadata: params['metadata']
    };
}
export function encodeProcessedExtractionTargetFile(__s: ISerializer, value: ProcessedExtractionTargetFile) {
    __s.writeInt32(1290052103);
    /**
     * encoding param: file
     */
    const __pv0 = value['file'];
    encodeFileLocation(__s,__pv0);
    /**
     * encoding param: metadata
     */
    const __pv1 = value['metadata'];
    encodeProcessedExtractionTargetFileMetadata(__s,__pv1);
}
export function decodeProcessedExtractionTargetFile(__d: IDeserializer): ProcessedExtractionTargetFile | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== 1290052103) return null;
    let file: FileLocation;
    let metadata: ProcessedExtractionTargetFileMetadata;
    /**
     * decoding param: file
     */
    const __tmp1 = decodeFileLocation(__d);
    if(__tmp1 === null) return null;
    file = __tmp1;
    /**
     * decoding param: metadata
     */
    const __tmp2 = decodeProcessedExtractionTargetFileMetadata(__d);
    if(__tmp2 === null) return null;
    metadata = __tmp2;
    return {
        _name: 'main.ProcessedExtractionTargetFile',
        file,
        metadata
    };
}
export function defaultProcessedExtractionTargetFile(params: Partial<ProcessedExtractionTargetFileInputParams> = {}): ProcessedExtractionTargetFile {
    return ProcessedExtractionTargetFile({
        file: defaultFileLocation(),
        metadata: defaultProcessedExtractionTargetFileMetadata(),
        ...params
    });
}
export function compareProcessedExtractionTargetFile(__a: ProcessedExtractionTargetFile, __b: ProcessedExtractionTargetFile): boolean {
    return (
        /**
         * compare parameter file
         */
        compareFileLocation(__a['file'],__b['file']) &&
        /**
         * compare parameter metadata
         */
        compareProcessedExtractionTargetFileMetadata(__a['metadata'],__b['metadata'])
    );
}
export function updateProcessedExtractionTargetFile(value: ProcessedExtractionTargetFile, changes: Partial<ProcessedExtractionTargetFileInputParams>) {
    if(typeof changes['file'] !== 'undefined') {
        if(!(compareFileLocation(changes['file'],value['file']))) {
            value = ProcessedExtractionTargetFile({
                ...value,
                file: changes['file'],
            });
        }
    }
    if(typeof changes['metadata'] !== 'undefined') {
        if(!(compareProcessedExtractionTargetFileMetadata(changes['metadata'],value['metadata']))) {
            value = ProcessedExtractionTargetFile({
                ...value,
                metadata: changes['metadata'],
            });
        }
    }
    return value;
}
export interface FileLocation  {
    _name: 'main.FileLocation';
    location: string;
}
export function isFileLocation(value: unknown): value is FileLocation {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.FileLocation")) return false;
    if(!(
        "location" in value && ((__v0) => (typeof __v0 === 'string'))(value['location'])
    )) return false;
    return true;
}
export interface FileLocationInputParams {
    location: string;
}
export function FileLocation(params: FileLocationInputParams): FileLocation {
    return {
        _name: 'main.FileLocation',
        location: params['location']
    };
}
export function encodeFileLocation(__s: ISerializer, value: FileLocation) {
    __s.writeInt32(1055334972);
    /**
     * encoding param: location
     */
    const __pv0 = value['location'];
    __s.writeString(__pv0);
}
export function decodeFileLocation(__d: IDeserializer): FileLocation | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== 1055334972) return null;
    let location: string;
    /**
     * decoding param: location
     */
    location = __d.readString();
    return {
        _name: 'main.FileLocation',
        location
    };
}
export function defaultFileLocation(params: Partial<FileLocationInputParams> = {}): FileLocation {
    return FileLocation({
        location: "",
        ...params
    });
}
export function compareFileLocation(__a: FileLocation, __b: FileLocation): boolean {
    return (
        /**
         * compare parameter location
         */
        __a['location'] === __b['location']
    );
}
export function updateFileLocation(value: FileLocation, changes: Partial<FileLocationInputParams>) {
    if(typeof changes['location'] !== 'undefined') {
        if(!(changes['location'] === value['location'])) {
            value = FileLocation({
                ...value,
                location: changes['location'],
            });
        }
    }
    return value;
}
export interface TestURL  {
    _name: 'main.TestURL';
    href: string;
    protocol: string;
    hostname: string;
    port: string | null;
    pathname: string;
    search: ReadonlyMap<string, string>;
}
export function isTestURL(value: unknown): value is TestURL {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.TestURL")) return false;
    if(!(
        "href" in value && ((__v0) => (typeof __v0 === 'string'))(value['href'])
    )) return false;
    if(!(
        "protocol" in value && ((__v1) => (typeof __v1 === 'string'))(value['protocol'])
    )) return false;
    if(!(
        "hostname" in value && ((__v2) => (typeof __v2 === 'string'))(value['hostname'])
    )) return false;
    if(!(
        "port" in value && ((__v3) => (__v3 === null ? true : ((x) => (typeof x === 'string'))(__v3)))(value['port'])
    )) return false;
    if(!(
        "pathname" in value && ((__v5) => (typeof __v5 === 'string'))(value['pathname'])
    )) return false;
    if(!(
        "search" in value && ((__v6) => (__v6 instanceof Map && Array.from(__v6).every(([k,v]) => (typeof k === 'string' && typeof v === 'string'))))(value['search'])
    )) return false;
    return true;
}
export interface TestURLInputParams {
    href: string;
    protocol: string;
    hostname: string;
    port: string | null;
    pathname: string;
    search: ReadonlyMap<string, string>;
}
export function TestURL(params: TestURLInputParams): TestURL {
    return {
        _name: 'main.TestURL',
        href: params['href'],
        protocol: params['protocol'],
        hostname: params['hostname'],
        port: params['port'],
        pathname: params['pathname'],
        search: params['search']
    };
}
export function encodeTestURL(__s: ISerializer, value: TestURL) {
    __s.writeInt32(1491604645);
    /**
     * encoding param: href
     */
    const __pv0 = value['href'];
    __s.writeString(__pv0);
    /**
     * encoding param: protocol
     */
    const __pv1 = value['protocol'];
    __s.writeString(__pv1);
    /**
     * encoding param: hostname
     */
    const __pv2 = value['hostname'];
    __s.writeString(__pv2);
    /**
     * encoding param: port
     */
    const __pv3 = value['port'];
    if(__pv3 === null) {
        __s.writeUint8(0);
    } else {
        __s.writeUint8(1);
        __s.writeString(__pv3);
    }
    /**
     * encoding param: pathname
     */
    const __pv5 = value['pathname'];
    __s.writeString(__pv5);
    /**
     * encoding param: search
     */
    const __pv6 = value['search'];
    __s.writeUint32(__pv6.size);
    for(const [__k7,__v7] of __pv6) {
        __s.writeString(__k7);
        __s.writeString(__v7);
    }
}
export function decodeTestURL(__d: IDeserializer): TestURL | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== 1491604645) return null;
    let href: string;
    let protocol: string;
    let hostname: string;
    let port: string | null;
    let pathname: string;
    let search: Map<string, string>;
    /**
     * decoding param: href
     */
    href = __d.readString();
    /**
     * decoding param: protocol
     */
    protocol = __d.readString();
    /**
     * decoding param: hostname
     */
    hostname = __d.readString();
    /**
     * decoding param: port
     */
    if(__d.readUint8() === 1) {
        port = __d.readString();
    } else {
        port = null;
    }
    /**
     * decoding param: pathname
     */
    pathname = __d.readString();
    /**
     * decoding param: search
     */
    const __l7 = __d.readUint32();
    const __o7 = new Map<string, string>();
    search = __o7;
    let __k7: string;
    let __v7: string;
    for(let __i7 = 0; __i7 < __l7; __i7++) {
        __k7 = __d.readString();
        __v7 = __d.readString();
        __o7.set(__k7, __v7);
    }
    return {
        _name: 'main.TestURL',
        href,
        protocol,
        hostname,
        port,
        pathname,
        search
    };
}
export function defaultTestURL(params: Partial<TestURLInputParams> = {}): TestURL {
    return TestURL({
        href: "",
        protocol: "",
        hostname: "",
        port: null,
        pathname: "",
        search: new Map<string, string>(),
        ...params
    });
}
export function compareTestURL(__a: TestURL, __b: TestURL): boolean {
    return (
        /**
         * compare parameter href
         */
        __a['href'] === __b['href'] &&
        /**
         * compare parameter protocol
         */
        __a['protocol'] === __b['protocol'] &&
        /**
         * compare parameter hostname
         */
        __a['hostname'] === __b['hostname'] &&
        /**
         * compare parameter port
         */
        ((__dp31, __dp32) => __dp31 !== null && __dp32 !== null ? __dp31 === __dp32 : __dp31 === __dp32)(__a['port'],__b['port']) &&
        /**
         * compare parameter pathname
         */
        __a['pathname'] === __b['pathname'] &&
        /**
         * compare parameter search
         */
        ((l1,l2) => (l1.every(([k1,v1],i) => ((__v25 => typeof __v25 === 'undefined' ? false : k1 === __v25[0] && v1 === __v25[1])(l2[i])))))(Array.from(__a['search']),Array.from(__b['search']))
    );
}
export function updateTestURL(value: TestURL, changes: Partial<TestURLInputParams>) {
    if(typeof changes['href'] !== 'undefined') {
        if(!(changes['href'] === value['href'])) {
            value = TestURL({
                ...value,
                href: changes['href'],
            });
        }
    }
    if(typeof changes['protocol'] !== 'undefined') {
        if(!(changes['protocol'] === value['protocol'])) {
            value = TestURL({
                ...value,
                protocol: changes['protocol'],
            });
        }
    }
    if(typeof changes['hostname'] !== 'undefined') {
        if(!(changes['hostname'] === value['hostname'])) {
            value = TestURL({
                ...value,
                hostname: changes['hostname'],
            });
        }
    }
    if(typeof changes['port'] !== 'undefined') {
        if(!(((__dp41, __dp42) => __dp41 !== null && __dp42 !== null ? __dp41 === __dp42 : __dp41 === __dp42)(changes['port'],value['port']))) {
            value = TestURL({
                ...value,
                port: changes['port'],
            });
        }
    }
    if(typeof changes['pathname'] !== 'undefined') {
        if(!(changes['pathname'] === value['pathname'])) {
            value = TestURL({
                ...value,
                pathname: changes['pathname'],
            });
        }
    }
    if(typeof changes['search'] !== 'undefined') {
        if(!(((l1,l2) => (l1.every(([k1,v1],i) => ((__v27 => typeof __v27 === 'undefined' ? false : k1 === __v27[0] && v1 === __v27[1])(l2[i])))))(Array.from(changes['search']),Array.from(value['search'])))) {
            value = TestURL({
                ...value,
                search: changes['search'],
            });
        }
    }
    return value;
}
export interface IPHttpResult  {
    _name: 'main.IPHttpResult';
    target: Readonly<TestURL>;
    result: Readonly<FileLocation>;
    status: number | null;
    response: Readonly<HttpConnectionInformation>;
    request: Readonly<HttpConnectionInformation>;
}
export function isIPHttpResult(value: unknown): value is IPHttpResult {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.IPHttpResult")) return false;
    if(!(
        "target" in value && ((__v0) => (isTestURL(__v0)))(value['target'])
    )) return false;
    if(!(
        "result" in value && ((__v1) => (isFileLocation(__v1)))(value['result'])
    )) return false;
    if(!(
        "status" in value && ((__v2) => (__v2 === null ? true : ((x) => (typeof x === 'number' && JSBI.equal(JSBI.BigInt(x),JSBI.BigInt(x)) && JSBI.greaterThanOrEqual(JSBI.BigInt(x),JSBI.BigInt("0")) && JSBI.lessThanOrEqual(JSBI.BigInt(x),JSBI.BigInt("65535"))))(__v2)))(value['status'])
    )) return false;
    if(!(
        "response" in value && ((__v4) => (isHttpConnectionInformation(__v4)))(value['response'])
    )) return false;
    if(!(
        "request" in value && ((__v5) => (isHttpConnectionInformation(__v5)))(value['request'])
    )) return false;
    return true;
}
export interface IPHttpResultInputParams {
    target: Readonly<TestURL>;
    result: Readonly<FileLocation>;
    status: number | null;
    response: Readonly<HttpConnectionInformation>;
    request: Readonly<HttpConnectionInformation>;
}
export function IPHttpResult(params: IPHttpResultInputParams): IPHttpResult {
    return {
        _name: 'main.IPHttpResult',
        target: params['target'],
        result: params['result'],
        status: params['status'],
        response: params['response'],
        request: params['request']
    };
}
export function encodeIPHttpResult(__s: ISerializer, value: IPHttpResult) {
    __s.writeInt32(1412938592);
    /**
     * encoding param: target
     */
    const __pv0 = value['target'];
    encodeTestURL(__s,__pv0);
    /**
     * encoding param: result
     */
    const __pv1 = value['result'];
    encodeFileLocation(__s,__pv1);
    /**
     * encoding param: status
     */
    const __pv2 = value['status'];
    if(__pv2 === null) {
        __s.writeUint8(0);
    } else {
        __s.writeUint8(1);
        __s.writeUint16(__pv2);
    }
    /**
     * encoding param: response
     */
    const __pv4 = value['response'];
    encodeHttpConnectionInformation(__s,__pv4);
    /**
     * encoding param: request
     */
    const __pv5 = value['request'];
    encodeHttpConnectionInformation(__s,__pv5);
}
export function decodeIPHttpResult(__d: IDeserializer): IPHttpResult | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== 1412938592) return null;
    let target: TestURL;
    let result: FileLocation;
    let status: number | null;
    let response: HttpConnectionInformation;
    let request: HttpConnectionInformation;
    /**
     * decoding param: target
     */
    const __tmp1 = decodeTestURL(__d);
    if(__tmp1 === null) return null;
    target = __tmp1;
    /**
     * decoding param: result
     */
    const __tmp2 = decodeFileLocation(__d);
    if(__tmp2 === null) return null;
    result = __tmp2;
    /**
     * decoding param: status
     */
    if(__d.readUint8() === 1) {
        status = __d.readUint16();
    } else {
        status = null;
    }
    /**
     * decoding param: response
     */
    const __tmp5 = decodeHttpConnectionInformation(__d);
    if(__tmp5 === null) return null;
    response = __tmp5;
    /**
     * decoding param: request
     */
    const __tmp6 = decodeHttpConnectionInformation(__d);
    if(__tmp6 === null) return null;
    request = __tmp6;
    return {
        _name: 'main.IPHttpResult',
        target,
        result,
        status,
        response,
        request
    };
}
export function defaultIPHttpResult(params: Partial<IPHttpResultInputParams> = {}): IPHttpResult {
    return IPHttpResult({
        target: defaultTestURL(),
        result: defaultFileLocation(),
        status: null,
        response: defaultHttpConnectionInformation(),
        request: defaultHttpConnectionInformation(),
        ...params
    });
}
export function compareIPHttpResult(__a: IPHttpResult, __b: IPHttpResult): boolean {
    return (
        /**
         * compare parameter target
         */
        compareTestURL(__a['target'],__b['target']) &&
        /**
         * compare parameter result
         */
        compareFileLocation(__a['result'],__b['result']) &&
        /**
         * compare parameter status
         */
        ((__dp21, __dp22) => __dp21 !== null && __dp22 !== null ? __dp21 === __dp22 : __dp21 === __dp22)(__a['status'],__b['status']) &&
        /**
         * compare parameter response
         */
        compareHttpConnectionInformation(__a['response'],__b['response']) &&
        /**
         * compare parameter request
         */
        compareHttpConnectionInformation(__a['request'],__b['request'])
    );
}
export function updateIPHttpResult(value: IPHttpResult, changes: Partial<IPHttpResultInputParams>) {
    if(typeof changes['target'] !== 'undefined') {
        if(!(compareTestURL(changes['target'],value['target']))) {
            value = IPHttpResult({
                ...value,
                target: changes['target'],
            });
        }
    }
    if(typeof changes['result'] !== 'undefined') {
        if(!(compareFileLocation(changes['result'],value['result']))) {
            value = IPHttpResult({
                ...value,
                result: changes['result'],
            });
        }
    }
    if(typeof changes['status'] !== 'undefined') {
        if(!(((__dp31, __dp32) => __dp31 !== null && __dp32 !== null ? __dp31 === __dp32 : __dp31 === __dp32)(changes['status'],value['status']))) {
            value = IPHttpResult({
                ...value,
                status: changes['status'],
            });
        }
    }
    if(typeof changes['response'] !== 'undefined') {
        if(!(compareHttpConnectionInformation(changes['response'],value['response']))) {
            value = IPHttpResult({
                ...value,
                response: changes['response'],
            });
        }
    }
    if(typeof changes['request'] !== 'undefined') {
        if(!(compareHttpConnectionInformation(changes['request'],value['request']))) {
            value = IPHttpResult({
                ...value,
                request: changes['request'],
            });
        }
    }
    return value;
}
export interface HttpConnectionInformation  {
    _name: 'main.HttpConnectionInformation';
    headers: ReadonlyMap<string, string>;
}
export function isHttpConnectionInformation(value: unknown): value is HttpConnectionInformation {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.HttpConnectionInformation")) return false;
    if(!(
        "headers" in value && ((__v0) => (__v0 instanceof Map && Array.from(__v0).every(([k,v]) => (typeof k === 'string' && typeof v === 'string'))))(value['headers'])
    )) return false;
    return true;
}
export interface HttpConnectionInformationInputParams {
    headers: ReadonlyMap<string, string>;
}
export function HttpConnectionInformation(params: HttpConnectionInformationInputParams): HttpConnectionInformation {
    return {
        _name: 'main.HttpConnectionInformation',
        headers: params['headers']
    };
}
export function encodeHttpConnectionInformation(__s: ISerializer, value: HttpConnectionInformation) {
    __s.writeInt32(459933033);
    /**
     * encoding param: headers
     */
    const __pv0 = value['headers'];
    __s.writeUint32(__pv0.size);
    for(const [__k1,__v1] of __pv0) {
        __s.writeString(__k1);
        __s.writeString(__v1);
    }
}
export function decodeHttpConnectionInformation(__d: IDeserializer): HttpConnectionInformation | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== 459933033) return null;
    let headers: Map<string, string>;
    /**
     * decoding param: headers
     */
    const __l1 = __d.readUint32();
    const __o1 = new Map<string, string>();
    headers = __o1;
    let __k1: string;
    let __v1: string;
    for(let __i1 = 0; __i1 < __l1; __i1++) {
        __k1 = __d.readString();
        __v1 = __d.readString();
        __o1.set(__k1, __v1);
    }
    return {
        _name: 'main.HttpConnectionInformation',
        headers
    };
}
export function defaultHttpConnectionInformation(params: Partial<HttpConnectionInformationInputParams> = {}): HttpConnectionInformation {
    return HttpConnectionInformation({
        headers: new Map<string, string>(),
        ...params
    });
}
export function compareHttpConnectionInformation(__a: HttpConnectionInformation, __b: HttpConnectionInformation): boolean {
    return (
        /**
         * compare parameter headers
         */
        ((l1,l2) => (l1.every(([k1,v1],i) => ((__v20 => typeof __v20 === 'undefined' ? false : k1 === __v20[0] && v1 === __v20[1])(l2[i])))))(Array.from(__a['headers']),Array.from(__b['headers']))
    );
}
export function updateHttpConnectionInformation(value: HttpConnectionInformation, changes: Partial<HttpConnectionInformationInputParams>) {
    if(typeof changes['headers'] !== 'undefined') {
        if(!(((l1,l2) => (l1.every(([k1,v1],i) => ((__v21 => typeof __v21 === 'undefined' ? false : k1 === __v21[0] && v1 === __v21[1])(l2[i])))))(Array.from(changes['headers']),Array.from(value['headers'])))) {
            value = HttpConnectionInformation({
                ...value,
                headers: changes['headers'],
            });
        }
    }
    return value;
}
export interface IPTestingResultFailure  {
    _name: 'main.IPTestingResultFailure';
    result: Readonly<IPHttpResult>;
}
export function isIPTestingResultFailure(value: unknown): value is IPTestingResultFailure {
    if(!(typeof value === 'object' && value !== null && '_name' in value && typeof value['_name'] === 'string' && value['_name'] === "main.IPTestingResultFailure")) return false;
    if(!(
        "result" in value && ((__v0) => (isIPHttpResult(__v0)))(value['result'])
    )) return false;
    return true;
}
export interface IPTestingResultFailureInputParams {
    result: Readonly<IPHttpResult>;
}
export function IPTestingResultFailure(params: IPTestingResultFailureInputParams): IPTestingResultFailure {
    return {
        _name: 'main.IPTestingResultFailure',
        result: params['result']
    };
}
export function encodeIPTestingResultFailure(__s: ISerializer, value: IPTestingResultFailure) {
    __s.writeInt32(-154464973);
    /**
     * encoding param: result
     */
    const __pv0 = value['result'];
    encodeIPHttpResult(__s,__pv0);
}
export function decodeIPTestingResultFailure(__d: IDeserializer): IPTestingResultFailure | null {
    const __id = __d.readInt32();
    /**
     * decode header
     */
    if(__id !== -154464973) return null;
    let result: IPHttpResult;
    /**
     * decoding param: result
     */
    const __tmp1 = decodeIPHttpResult(__d);
    if(__tmp1 === null) return null;
    result = __tmp1;
    return {
        _name: 'main.IPTestingResultFailure',
        result
    };
}
export function defaultIPTestingResultFailure(params: Partial<IPTestingResultFailureInputParams> = {}): IPTestingResultFailure {
    return IPTestingResultFailure({
        result: defaultIPHttpResult(),
        ...params
    });
}
export function compareIPTestingResultFailure(__a: IPTestingResultFailure, __b: IPTestingResultFailure): boolean {
    return (
        /**
         * compare parameter result
         */
        compareIPHttpResult(__a['result'],__b['result'])
    );
}
export function updateIPTestingResultFailure(value: IPTestingResultFailure, changes: Partial<IPTestingResultFailureInputParams>) {
    if(typeof changes['result'] !== 'undefined') {
        if(!(compareIPHttpResult(changes['result'],value['result']))) {
            value = IPTestingResultFailure({
                ...value,
                result: changes['result'],
            });
        }
    }
    return value;
}
