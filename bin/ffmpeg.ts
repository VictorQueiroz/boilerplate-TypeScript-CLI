// Codecs:
//  D..... = Decoding supported
//  .E.... = Encoding supported
//  ..V... = Video codec
//  ..A... = Audio codec
//  ..S... = Subtitle codec
//  ..D... = Data codec
//  ..T... = Attachment codec
//  ...I.. = Intra frame-only codec
//  ....L. = Lossy compression
//  .....S = Lossless compression
//  -------
//  D.VI.S 012v                 Uncompressed 4:2:2 10-bit
//  D.V.L. 4xm                  4X Movie
//  D.VI.S 8bps                 QuickTime 8BPS video
//  .EVIL. a64_multi            Multicolor charset for Commodore 64 (encoders: a64multi)
//  .EVIL. a64_multi5           Multicolor charset for Commodore 64, extended with 5th color (colram) (encoders: a64multi5)
//  D.V..S aasc                 Autodesk RLE
//  D.V.L. agm                  Amuse Graphics Movie
//  D.VIL. aic                  Apple Intermediate Codec
//  DEVI.S alias_pix            Alias/Wavefront PIX image
//  DEVIL. amv                  AMV Video
//  D.V.L. anm                  Deluxe Paint Animation
//  D.V.L. ansi                 ASCII/ANSI art
//  DEV..S apng                 APNG (Animated Portable Network Graphics) image
//  D.V.L. arbc                 Gryphon's Anim Compressor
//  D.V.L. argo                 Argonaut Games Video
//  DEVIL. asv1                 ASUS V1
//  DEVIL. asv2                 ASUS V2
//  D.VIL. aura                 Auravision AURA
//  D.VIL. aura2                Auravision Aura 2
//  DEV.L. av1                  Alliance for Open Media AV1 (decoders: libdav1d libaom-av1 av1 av1_cuvid av1_qsv) (encoders: libaom-av1 librav1e libsvtav1 av1_nvenc av1_qsv av1_amf av1_vaapi)
//  D.VI.S avrn                 Avid AVI Codec
//  DEVI.S avrp                 Avid 1:1 10-bit RGB Packer
//  D.V.L. avs                  AVS (Audio Video Standard) video
//  ..V.L. avs2                 AVS2-P2/IEEE1857.4
//  ..V.L. avs3                 AVS3-P2/IEEE1857.10
//  DEVI.S avui                 Avid Meridien Uncompressed
//  D.V.L. bethsoftvid          Bethesda VID video
//  D.V.L. bfi                  Brute Force & Ignorance
//  D.V.L. binkvideo            Bink video
//  D.VI.. bintext              Binary text
//  DEVI.S bitpacked            Bitpacked
//  DEVI.S bmp                  BMP (Windows and OS/2 bitmap)
//  D.V..S bmv_video            Discworld II BMV video
//  D.VI.S brender_pix          BRender PIX image
//  D.V.L. c93                  Interplay C93
//  D.V.L. cavs                 Chinese AVS (Audio Video Standard) (AVS1-P2, JiZhun profile)
//  D.V.L. cdgraphics           CD Graphics video
//  D.V..S cdtoons              CDToons video
//  D.VIL. cdxl                 Commodore CDXL video
//  DEV.L. cfhd                 GoPro CineForm HD
//  DEV.L. cinepak              Cinepak
//  D.V.L. clearvideo           Iterated Systems ClearVideo
//  DEVIL. cljr                 Cirrus Logic AccuPak
//  D.VI.S cllc                 Canopus Lossless Codec
//  D.V.L. cmv                  Electronic Arts CMV video (decoders: eacmv)
//  D.V... cpia                 CPiA video format
//  D.VILS cri                  Cintel RAW
//  D.V..S cscd                 CamStudio (decoders: camstudio)
//  D.VIL. cyuv                 Creative YUV (CYUV)
//  ..V.LS daala                Daala
//  D.VILS dds                  DirectDraw Surface image decoder
//  D.V.L. dfa                  Chronomaster DFA
//  DEV.LS dirac                Dirac (encoders: vc2)
//  DEVIL. dnxhd                VC3/DNxHD
//  DEVI.S dpx                  DPX (Digital Picture Exchange) image
//  D.V.L. dsicinvideo          Delphine Software International CIN video
//  DEVIL. dvvideo              DV (Digital Video)
//  D.V..S dxa                  Feeble Files/ScummVM DXA
//  D.VI.S dxtory               Dxtory
//  DEVIL. dxv                  Resolume DXV
//  D.V.L. escape124            Escape 124
//  D.V.L. escape130            Escape 130
//  ..V.L. evc                  MPEG-5 EVC (Essential Video Coding)
//  DEVILS exr                  OpenEXR image
//  DEV..S ffv1                 FFmpeg video codec #1
//  DEVI.S ffvhuff              Huffyuv FFmpeg variant
//  D.V.L. fic                  Mirillis FIC
//  DEVI.S fits                 FITS (Flexible Image Transport System)
//  DEV..S flashsv              Flash Screen Video v1
//  DEV.L. flashsv2             Flash Screen Video v2
//  D.V..S flic                 Autodesk Animator Flic video
//  DEV.L. flv1                 FLV / Sorenson Spark / Sorenson H.263 (Flash Video) (decoders: flv) (encoders: flv)
//  D.V..S fmvc                 FM Screen Capture Codec
//  D.VI.S fraps                Fraps
//  D.VI.S frwu                 Forward Uncompressed
//  D.V.L. g2m                  Go2Meeting
//  D.V.L. gdv                  Gremlin Digital Video
//  D.V.L. gem                  GEM Raster image
//  DEV..S gif                  CompuServe GIF (Graphics Interchange Format)
//  DEV.L. h261                 H.261
//  DEV.L. h263                 H.263 / H.263-1996, H.263+ / H.263-1998 / H.263 version 2 (decoders: h263 h263_v4l2m2m) (encoders: h263 h263_v4l2m2m)
//  D.V.L. h263i                Intel H.263
//  DEV.L. h263p                H.263+ / H.263-1998 / H.263 version 2
//  DEV.LS h264                 H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10 (decoders: h264 h264_v4l2m2m h264_qsv h264_cuvid) (encoders: libx264 libx264rgb h264_amf h264_nvenc h264_qsv h264_v4l2m2m h264_vaapi h264_vulkan)
//  DEVIL. hap                  Vidvox Hap
//  DEVIL. hdr                  HDR (Radiance RGBE format) image
//  DEV.L. hevc                 H.265 / HEVC (High Efficiency Video Coding) (decoders: hevc hevc_qsv hevc_v4l2m2m hevc_cuvid) (encoders: libx265 hevc_amf hevc_nvenc hevc_qsv hevc_v4l2m2m hevc_vaapi hevc_vulkan)
//  D.V.L. hnm4video            HNM 4 video
//  D.VIL. hq_hqa               Canopus HQ/HQA
//  D.VIL. hqx                  Canopus HQX
//  DEVI.S huffyuv              HuffYUV
//  D.VI.S hymt                 HuffYUV MT
//  D.V.L. idcin                id Quake II CIN video (decoders: idcinvideo)
//  D.VI.. idf                  iCEDraw text
//  D.V.L. iff_ilbm             IFF ACBM/ANIM/DEEP/ILBM/PBM/RGB8/RGBN (decoders: iff)
//  D.V.L. imm4                 Infinity IMM4
//  D.V.L. imm5                 Infinity IMM5
//  D.V.L. indeo2               Intel Indeo 2
//  D.V.L. indeo3               Intel Indeo 3
//  D.V.L. indeo4               Intel Indeo Video Interactive 4
//  D.V.L. indeo5               Intel Indeo Video Interactive 5
//  D.V.L. interplayvideo       Interplay MVE video
//  D.VIL. ipu                  IPU Video
//  DEVILS jpeg2000             JPEG 2000 (encoders: jpeg2000 libopenjpeg)
//  DEVILS jpegls               JPEG-LS
//  DEVILS jpegxl               JPEG XL (decoders: libjxl) (encoders: libjxl)
//  D.V.L. jv                   Bitmap Brothers JV video
//  D.V.L. kgv1                 Kega Game Video
//  D.V.L. kmvc                 Karl Morton's video codec
//  D.VI.S lagarith             Lagarith lossless
//  D.VIL. lead                 LEAD MCMP
//  .EVI.S ljpeg                Lossless JPEG
//  D.VI.S loco                 LOCO
//  D.V.L. lscr                 LEAD Screen Capture
//  D.VI.S m101                 Matrox Uncompressed SD
//  D.V.L. mad                  Electronic Arts Madcow Video (decoders: eamad)
//  DEVI.S magicyuv             MagicYUV video
//  D.VIL. mdec                 Sony PlayStation MDEC (Motion DECoder)
//  D.VIL. media100             Media 100i
//  D.V.L. mimic                Mimic
//  DEVIL. mjpeg                Motion JPEG (decoders: mjpeg mjpeg_cuvid mjpeg_qsv) (encoders: mjpeg mjpeg_qsv mjpeg_vaapi)
//  D.VIL. mjpegb               Apple MJPEG-B
//  D.V.L. mmvideo              American Laser Games MM Video
//  D.V.L. mobiclip             MobiClip Video
//  D.V.L. motionpixels         Motion Pixels video
//  DEV.L. mpeg1video           MPEG-1 video (decoders: mpeg1video mpeg1_v4l2m2m mpeg1_cuvid)
//  DEV.L. mpeg2video           MPEG-2 video (decoders: mpeg2video mpegvideo mpeg2_v4l2m2m mpeg2_qsv mpeg2_cuvid) (encoders: mpeg2video mpeg2_qsv mpeg2_vaapi)
//  DEV.L. mpeg4                MPEG-4 part 2 (decoders: mpeg4 mpeg4_v4l2m2m mpeg4_cuvid) (encoders: mpeg4 libxvid mpeg4_v4l2m2m)
//  D.V.L. msa1                 MS ATC Screen
//  D.VI.S mscc                 Mandsoft Screen Capture Codec
//  D.V.L. msmpeg4v1            MPEG-4 part 2 Microsoft variant version 1
//  DEV.L. msmpeg4v2            MPEG-4 part 2 Microsoft variant version 2
//  DEV.L. msmpeg4v3            MPEG-4 part 2 Microsoft variant version 3 (decoders: msmpeg4) (encoders: msmpeg4)
//  D.VI.S msp2                 Microsoft Paint (MSP) version 2
//  DEV..S msrle                Microsoft RLE
//  D.V.L. mss1                 MS Screen 1
//  D.VIL. mss2                 MS Windows Media Video V9 Screen
//  DEV.L. msvideo1             Microsoft Video 1
//  D.VI.S mszh                 LCL (LossLess Codec Library) MSZH
//  D.V.L. mts2                 MS Expression Encoder Screen
//  D.V.L. mv30                 MidiVid 3.0
//  D.VIL. mvc1                 Silicon Graphics Motion Video Compressor 1
//  D.VIL. mvc2                 Silicon Graphics Motion Video Compressor 2
//  D.V.L. mvdv                 MidiVid VQ
//  D.VIL. mvha                 MidiVid Archive Codec
//  D.V..S mwsc                 MatchWare Screen Capture Codec
//  D.V.L. mxpeg                Mobotix MxPEG video
//  D.VIL. notchlc              NotchLC
//  D.V.L. nuv                  NuppelVideo/RTJPEG
//  D.V.L. paf_video            Amazing Studio Packed Animation File Video
//  DEVI.S pam                  PAM (Portable AnyMap) image
//  DEVI.S pbm                  PBM (Portable BitMap) image
//  DEVI.S pcx                  PC Paintbrush PCX image
//  D.V.L. pdv                  PDV (PlayDate Video)
//  DEVI.S pfm                  PFM (Portable FloatMap) image
//  DEVI.S pgm                  PGM (Portable GrayMap) image
//  DEVI.S pgmyuv               PGMYUV (Portable GrayMap YUV) image
//  D.VI.S pgx                  PGX (JPEG2000 Test Format)
//  DEVI.S phm                  PHM (Portable HalfFloatMap) image
//  D.VIL. photocd              Kodak Photo CD
//  D.VIL. pictor               Pictor/PC Paint
//  D.VIL. pixlet               Apple Pixlet
//  DEV..S png                  PNG (Portable Network Graphics) image
//  DEVI.S ppm                  PPM (Portable PixelMap) image
//  DEVIL. prores               Apple ProRes (iCodec Pro) (encoders: prores prores_aw prores_ks)
//  D.VIL. prosumer             Brooktree ProSumer Video
//  D.VI.S psd                  Photoshop PSD file
//  D.VIL. ptx                  V.Flash PTX image
//  D.VI.S qdraw                Apple QuickDraw
//  DEVI.S qoi                  QOI (Quite OK Image)
//  D.V.L. qpeg                 Q-team QPEG
//  DEV..S qtrle                QuickTime Animation (RLE) video
//  DEVI.S r10k                 AJA Kona 10-bit RGB Codec
//  DEVI.S r210                 Uncompressed RGB 10-bit
//  D.V.L. rasc                 RemotelyAnywhere Screen Capture
//  DEVI.S rawvideo             raw video
//  D.VIL. rl2                  RL2 video
//  DEV.L. roq                  id RoQ video (decoders: roqvideo) (encoders: roqvideo)
//  DEV.L. rpza                 QuickTime video (RPZA)
//  D.V..S rscc                 innoHeim/Rsupport Screen Capture Codec
//  D.VIL. rtv1                 RTV1 (RivaTuner Video)
//  DEV.L. rv10                 RealVideo 1.0
//  DEV.L. rv20                 RealVideo 2.0
//  D.V.L. rv30                 RealVideo 3.0
//  D.V.L. rv40                 RealVideo 4.0
//  D.V.L. sanm                 LucasArts SANM/SMUSH video
//  D.V.LS scpr                 ScreenPressor
//  D.V..S screenpresso         Screenpresso
//  D.V.L. sga                  Digital Pictures SGA Video
//  DEVI.S sgi                  SGI image
//  D.VI.S sgirle               SGI RLE 8-bit
//  D.VI.S sheervideo           BitJazz SheerVideo
//  D.V.L. simbiosis_imx        Simbiosis Interactive IMX Video
//  D.V.L. smackvideo           Smacker video (decoders: smackvid)
//  DEV.L. smc                  QuickTime Graphics (SMC)
//  D.VIL. smvjpeg              Sigmatel Motion Video
//  DEV.LS snow                 Snow
//  D.VIL. sp5x                 Sunplus JPEG (SP5X)
//  DEVIL. speedhq              NewTek SpeedHQ
//  D.VI.S srgc                 Screen Recorder Gold Codec
//  DEVI.S sunrast              Sun Rasterfile image
//  D.V..S svg                  Scalable Vector Graphics (decoders: librsvg)
//  DEV.L. svq1                 Sorenson Vector Quantizer 1 / Sorenson Video 1 / SVQ1
//  D.V.L. svq3                 Sorenson Vector Quantizer 3 / Sorenson Video 3 / SVQ3
//  DEVI.S targa                Truevision Targa image
//  D.VI.S targa_y216           Pinnacle TARGA CineWave YUV16
//  D.V.L. tdsc                 TDSC
//  D.VIL. tgq                  Electronic Arts TGQ video (decoders: eatgq)
//  D.V.L. tgv                  Electronic Arts TGV video (decoders: eatgv)
//  DEV.L. theora               Theora (encoders: libtheora)
//  D.VIL. thp                  Nintendo Gamecube THP video
//  D.V.L. tiertexseqvideo      Tiertex Limited SEQ video
//  DEVI.S tiff                 TIFF image
//  D.VIL. tmv                  8088flex TMV
//  D.V.L. tqi                  Electronic Arts TQI video (decoders: eatqi)
//  D.V.L. truemotion1          Duck TrueMotion 1.0
//  D.V.L. truemotion2          Duck TrueMotion 2.0
//  D.VIL. truemotion2rt        Duck TrueMotion 2.0 Real Time
//  D.V..S tscc                 TechSmith Screen Capture Codec (decoders: camtasia)
//  D.V.L. tscc2                TechSmith Screen Codec 2
//  D.VIL. txd                  Renderware TXD (TeXture Dictionary) image
//  D.V.L. ulti                 IBM UltiMotion (decoders: ultimotion)
//  DEVI.S utvideo              Ut Video
//  DEVI.S v210                 Uncompressed 4:2:2 10-bit
//  D.VI.S v210x                Uncompressed 4:2:2 10-bit
//  DEVI.S v308                 Uncompressed packed 4:4:4
//  DEVI.S v408                 Uncompressed packed QT 4:4:4:4
//  DEVI.S v410                 Uncompressed 4:4:4 10-bit
//  D.V.L. vb                   Beam Software VB
//  D.VI.S vble                 VBLE Lossless Codec
//  DEVIL. vbn                  Vizrt Binary Image
//  D.V.L. vc1                  SMPTE VC-1 (decoders: vc1 vc1_qsv vc1_v4l2m2m vc1_cuvid)
//  D.V.L. vc1image             Windows Media Video 9 Image v2
//  D.VIL. vcr1                 ATI VCR1
//  D.VIL. vixl                 Miro VideoXL (decoders: xl)
//  D.V.L. vmdvideo             Sierra VMD video
//  D.VIL. vmix                 vMix Video
//  D.V..S vmnc                 VMware Screen Codec / VMware Video
//  DEV... vnull                Null video codec
//  D.V.L. vp3                  On2 VP3
//  D.V.L. vp4                  On2 VP4
//  D.V.L. vp5                  On2 VP5
//  D.V.L. vp6                  On2 VP6
//  D.V.L. vp6a                 On2 VP6 (Flash version, with alpha channel)
//  D.V.L. vp6f                 On2 VP6 (Flash version)
//  D.V.L. vp7                  On2 VP7
//  DEV.L. vp8                  On2 VP8 (decoders: vp8 vp8_v4l2m2m libvpx vp8_cuvid vp8_qsv) (encoders: libvpx vp8_v4l2m2m vp8_vaapi)
//  DEV.L. vp9                  Google VP9 (decoders: vp9 vp9_v4l2m2m libvpx-vp9 vp9_cuvid vp9_qsv) (encoders: libvpx-vp9 vp9_vaapi vp9_qsv)
//  D.V.L. vqc                  ViewQuest VQC
//  D.V.L. vvc                  H.266 / VVC (Versatile Video Coding) (decoders: vvc vvc_qsv)
//  DEVI.S wbmp                 WBMP (Wireless Application Protocol Bitmap) image
//  D.V..S wcmv                 WinCAM Motion Video
//  DEVILS webp                 WebP (encoders: libwebp_anim libwebp)
//  DEV.L. wmv1                 Windows Media Video 7
//  DEV.L. wmv2                 Windows Media Video 8
//  D.V.L. wmv3                 Windows Media Video 9
//  D.V.L. wmv3image            Windows Media Video 9 Image
//  D.VIL. wnv1                 Winnov WNV1
//  DEV..S wrapped_avframe      AVFrame to AVPacket passthrough
//  D.V.L. ws_vqa               Westwood Studios VQA (Vector Quantized Animation) video (decoders: vqavideo)
//  D.V.L. xan_wc3              Wing Commander III / Xan
//  D.V.L. xan_wc4              Wing Commander IV / Xxan
//  D.VI.. xbin                 eXtended BINary text
//  DEVI.S xbm                  XBM (X BitMap) image
//  DEVIL. xface                X-face image
//  D.VI.S xpm                  XPM (X PixMap) image
//  DEVI.S xwd                  XWD (X Window Dump) image
//  DEVI.S y41p                 Uncompressed YUV 4:1:1 12-bit
//  D.VI.S ylc                  YUY2 Lossless Codec
//  D.V.L. yop                  Psygnosis YOP Video
//  DEVI.S yuv4                 Uncompressed packed 4:2:0
//  D.V..S zerocodec            ZeroCodec Lossless Video
//  DEVI.S zlib                 LCL (LossLess Codec Library) ZLIB
//  DEV..S zmbv                 Zip Motion Blocks Video
//  ..AIL. 4gv                  4GV (Fourth Generation Vocoder)
//  D.AIL. 8svx_exp             8SVX exponential
//  D.AIL. 8svx_fib             8SVX fibonacci
//  DEAIL. aac                  AAC (Advanced Audio Coding) (decoders: aac aac_fixed)
//  D.AIL. aac_latm             AAC LATM (Advanced Audio Coding LATM syntax)
//  DEAIL. ac3                  ATSC A/52A (AC-3) (decoders: ac3 ac3_fixed) (encoders: ac3 ac3_fixed)
//  ..A.L. ac4                  AC-4
//  D.AIL. acelp.kelvin         Sipro ACELP.KELVIN
//  D.AIL. adpcm_4xm            ADPCM 4X Movie
//  DEAIL. adpcm_adx            SEGA CRI ADX ADPCM
//  D.AIL. adpcm_afc            ADPCM Nintendo Gamecube AFC
//  D.AIL. adpcm_agm            ADPCM AmuseGraphics Movie AGM
//  D.AIL. adpcm_aica           ADPCM Yamaha AICA
//  DEAIL. adpcm_argo           ADPCM Argonaut Games
//  D.AIL. adpcm_ct             ADPCM Creative Technology
//  D.AIL. adpcm_dtk            ADPCM Nintendo Gamecube DTK
//  D.AIL. adpcm_ea             ADPCM Electronic Arts
//  D.AIL. adpcm_ea_maxis_xa    ADPCM Electronic Arts Maxis CDROM XA
//  D.AIL. adpcm_ea_r1          ADPCM Electronic Arts R1
//  D.AIL. adpcm_ea_r2          ADPCM Electronic Arts R2
//  D.AIL. adpcm_ea_r3          ADPCM Electronic Arts R3
//  D.AIL. adpcm_ea_xas         ADPCM Electronic Arts XAS
//  DEAIL. adpcm_g722           G.722 ADPCM (decoders: g722) (encoders: g722)
//  DEAIL. adpcm_g726           G.726 ADPCM (decoders: g726) (encoders: g726)
//  DEAIL. adpcm_g726le         G.726 ADPCM little-endian (decoders: g726le) (encoders: g726le)
//  D.AIL. adpcm_ima_acorn      ADPCM IMA Acorn Replay
//  DEAIL. adpcm_ima_alp        ADPCM IMA High Voltage Software ALP
//  DEAIL. adpcm_ima_amv        ADPCM IMA AMV
//  D.AIL. adpcm_ima_apc        ADPCM IMA CRYO APC
//  DEAIL. adpcm_ima_apm        ADPCM IMA Ubisoft APM
//  D.AIL. adpcm_ima_cunning    ADPCM IMA Cunning Developments
//  D.AIL. adpcm_ima_dat4       ADPCM IMA Eurocom DAT4
//  D.AIL. adpcm_ima_dk3        ADPCM IMA Duck DK3
//  D.AIL. adpcm_ima_dk4        ADPCM IMA Duck DK4
//  D.AIL. adpcm_ima_ea_eacs    ADPCM IMA Electronic Arts EACS
//  D.AIL. adpcm_ima_ea_sead    ADPCM IMA Electronic Arts SEAD
//  D.AIL. adpcm_ima_iss        ADPCM IMA Funcom ISS
//  D.AIL. adpcm_ima_moflex     ADPCM IMA MobiClip MOFLEX
//  D.AIL. adpcm_ima_mtf        ADPCM IMA Capcom's MT Framework
//  D.AIL. adpcm_ima_oki        ADPCM IMA Dialogic OKI
//  DEAIL. adpcm_ima_qt         ADPCM IMA QuickTime
//  D.AIL. adpcm_ima_rad        ADPCM IMA Radical
//  D.AIL. adpcm_ima_smjpeg     ADPCM IMA Loki SDL MJPEG
//  DEAIL. adpcm_ima_ssi        ADPCM IMA Simon & Schuster Interactive
//  DEAIL. adpcm_ima_wav        ADPCM IMA WAV
//  DEAIL. adpcm_ima_ws         ADPCM IMA Westwood
//  DEAIL. adpcm_ms             ADPCM Microsoft
//  D.AIL. adpcm_mtaf           ADPCM MTAF
//  D.AIL. adpcm_psx            ADPCM Playstation
//  D.AIL. adpcm_sbpro_2        ADPCM Sound Blaster Pro 2-bit
//  D.AIL. adpcm_sbpro_3        ADPCM Sound Blaster Pro 2.6-bit
//  D.AIL. adpcm_sbpro_4        ADPCM Sound Blaster Pro 4-bit
//  DEAIL. adpcm_swf            ADPCM Shockwave Flash
//  D.AIL. adpcm_thp            ADPCM Nintendo THP
//  D.AIL. adpcm_thp_le         ADPCM Nintendo THP (Little-Endian)
//  D.AIL. adpcm_vima           LucasArts VIMA audio
//  D.AIL. adpcm_xa             ADPCM CDROM XA
//  D.AIL. adpcm_xmd            ADPCM Konami XMD
//  DEAIL. adpcm_yamaha         ADPCM Yamaha
//  D.AIL. adpcm_zork           ADPCM Zork
//  DEAI.S alac                 ALAC (Apple Lossless Audio Codec)
//  DEAIL. amr_nb               AMR-NB (Adaptive Multi-Rate NarrowBand) (decoders: amrnb libopencore_amrnb) (encoders: libopencore_amrnb)
//  D.AIL. amr_wb               AMR-WB (Adaptive Multi-Rate WideBand) (decoders: amrwb libopencore_amrwb)
//  DEA... anull                Null audio codec
//  D.AI.S apac                 Marian's A-pac audio
//  D.AI.S ape                  Monkey's Audio
//  DEAIL. aptx                 aptX (Audio Processing Technology for Bluetooth)
//  DEAIL. aptx_hd              aptX HD (Audio Processing Technology for Bluetooth)
//  D.AIL. atrac1               ATRAC1 (Adaptive TRansform Acoustic Coding)
//  D.AIL. atrac3               ATRAC3 (Adaptive TRansform Acoustic Coding 3)
//  D.AI.S atrac3al             ATRAC3 AL (Adaptive TRansform Acoustic Coding 3 Advanced Lossless)
//  D.AIL. atrac3p              ATRAC3+ (Adaptive TRansform Acoustic Coding 3+) (decoders: atrac3plus)
//  D.AI.S atrac3pal            ATRAC3+ AL (Adaptive TRansform Acoustic Coding 3+ Advanced Lossless) (decoders: atrac3plusal)
//  D.AIL. atrac9               ATRAC9 (Adaptive TRansform Acoustic Coding 9)
//  D.AIL. avc                  On2 Audio for Video Codec (decoders: on2avc)
//  D.AIL. binkaudio_dct        Bink Audio (DCT)
//  D.AIL. binkaudio_rdft       Bink Audio (RDFT)
//  D.AIL. bmv_audio            Discworld II BMV audio
//  D.AILS bonk                 Bonk audio
//  D.AIL. cbd2_dpcm            DPCM Cuberoot-Delta-Exact
//  ..AIL. celt                 Constrained Energy Lapped Transform (CELT)
//  ..AIL. codec2               codec2 (very low bitrate speech codec)
//  DEAIL. comfortnoise         RFC 3389 Comfort Noise
//  D.AIL. cook                 Cook / Cooker / Gecko (RealAudio G2)
//  D.AIL. derf_dpcm            DPCM Xilam DERF
//  DEA.L. dfpwm                DFPWM (Dynamic Filter Pulse Width Modulation)
//  D.AIL. dolby_e              Dolby E
//  D.AIL. dsd_lsbf             DSD (Direct Stream Digital), least significant bit first
//  D.AIL. dsd_lsbf_planar      DSD (Direct Stream Digital), least significant bit first, planar
//  D.AIL. dsd_msbf             DSD (Direct Stream Digital), most significant bit first
//  D.AIL. dsd_msbf_planar      DSD (Direct Stream Digital), most significant bit first, planar
//  D.AIL. dsicinaudio          Delphine Software International CIN audio
//  D.AIL. dss_sp               Digital Speech Standard - Standard Play mode (DSS SP)
//  D.AI.S dst                  DST (Direct Stream Transfer)
//  DEAILS dts                  DCA (DTS Coherent Acoustics) (decoders: dca) (encoders: dca)
//  D.AIL. dvaudio              DV audio
//  DEAIL. eac3                 ATSC A/52B (AC-3, E-AC-3)
//  D.AIL. evrc                 EVRC (Enhanced Variable Rate Codec)
//  D.AIL. fastaudio            MobiClip FastAudio
//  DEAI.S flac                 FLAC (Free Lossless Audio Codec)
//  D.AIL. ftr                  FTR Voice
//  DEAIL. g723_1               G.723.1
//  D.AIL. g729                 G.729
//  D.AIL. gremlin_dpcm         DPCM Gremlin
//  DEAIL. gsm                  GSM (decoders: gsm libgsm) (encoders: libgsm)
//  DEAIL. gsm_ms               GSM Microsoft variant (decoders: gsm_ms libgsm_ms) (encoders: libgsm_ms)
//  D.AIL. hca                  CRI HCA
//  D.AIL. hcom                 HCOM Audio
//  D.AIL. iac                  IAC (Indeo Audio Coder)
//  D.AIL. ilbc                 iLBC (Internet Low Bitrate Codec)
//  D.AIL. imc                  IMC (Intel Music Coder)
//  D.AIL. interplay_dpcm       DPCM Interplay
//  D.AIL. interplayacm         Interplay ACM
//  ..AIL. lc3                  LC3 (Low Complexity Communication Codec)
//  D.AIL. mace3                MACE (Macintosh Audio Compression/Expansion) 3:1
//  D.AIL. mace6                MACE (Macintosh Audio Compression/Expansion) 6:1
//  D.AIL. metasound            Voxware MetaSound
//  D.AIL. misc4                Micronas SC-4 Audio
//  DEA..S mlp                  MLP (Meridian Lossless Packing)
//  D.AIL. mp1                  MP1 (MPEG audio layer 1) (decoders: mp1 mp1float)
//  DEAIL. mp2                  MP2 (MPEG audio layer 2) (decoders: mp2 mp2float) (encoders: mp2 mp2fixed)
//  DEAIL. mp3                  MP3 (MPEG audio layer 3) (decoders: mp3float mp3) (encoders: libmp3lame)
//  D.AIL. mp3adu               ADU (Application Data Unit) MP3 (MPEG audio layer 3) (decoders: mp3adufloat mp3adu)
//  D.AIL. mp3on4               MP3onMP4 (decoders: mp3on4float mp3on4)
//  D.AI.S mp4als               MPEG-4 Audio Lossless Coding (ALS) (decoders: als)
//  ..A.L. mpegh_3d_audio       MPEG-H 3D Audio
//  D.AIL. msnsiren             MSN Siren
//  D.AIL. musepack7            Musepack SV7 (decoders: mpc7)
//  D.AIL. musepack8            Musepack SV8 (decoders: mpc8)
//  DEAIL. nellymoser           Nellymoser Asao
//  DEAIL. opus                 Opus (Opus Interactive Audio Codec) (decoders: opus libopus) (encoders: opus libopus)
//  D.AI.S osq                  OSQ (Original Sound Quality)
//  D.AIL. paf_audio            Amazing Studio Packed Animation File Audio
//  DEAIL. pcm_alaw             PCM A-law / G.711 A-law
//  DEAI.S pcm_bluray           PCM signed 16|20|24-bit big-endian for Blu-ray media
//  DEAI.S pcm_dvd              PCM signed 20|24-bit big-endian
//  D.AI.S pcm_f16le            PCM 16.8 floating point little-endian
//  D.AI.S pcm_f24le            PCM 24.0 floating point little-endian
//  DEAI.S pcm_f32be            PCM 32-bit floating point big-endian
//  DEAI.S pcm_f32le            PCM 32-bit floating point little-endian
//  DEAI.S pcm_f64be            PCM 64-bit floating point big-endian
//  DEAI.S pcm_f64le            PCM 64-bit floating point little-endian
//  D.AI.S pcm_lxf              PCM signed 20-bit little-endian planar
//  DEAIL. pcm_mulaw            PCM mu-law / G.711 mu-law
//  DEAI.S pcm_s16be            PCM signed 16-bit big-endian
//  DEAI.S pcm_s16be_planar     PCM signed 16-bit big-endian planar
//  DEAI.S pcm_s16le            PCM signed 16-bit little-endian
//  DEAI.S pcm_s16le_planar     PCM signed 16-bit little-endian planar
//  DEAI.S pcm_s24be            PCM signed 24-bit big-endian
//  DEAI.S pcm_s24daud          PCM D-Cinema audio signed 24-bit
//  DEAI.S pcm_s24le            PCM signed 24-bit little-endian
//  DEAI.S pcm_s24le_planar     PCM signed 24-bit little-endian planar
//  DEAI.S pcm_s32be            PCM signed 32-bit big-endian
//  DEAI.S pcm_s32le            PCM signed 32-bit little-endian
//  DEAI.S pcm_s32le_planar     PCM signed 32-bit little-endian planar
//  DEAI.S pcm_s64be            PCM signed 64-bit big-endian
//  DEAI.S pcm_s64le            PCM signed 64-bit little-endian
//  DEAI.S pcm_s8               PCM signed 8-bit
//  DEAI.S pcm_s8_planar        PCM signed 8-bit planar
//  D.AI.S pcm_sga              PCM SGA
//  DEAI.S pcm_u16be            PCM unsigned 16-bit big-endian
//  DEAI.S pcm_u16le            PCM unsigned 16-bit little-endian
//  DEAI.S pcm_u24be            PCM unsigned 24-bit big-endian
//  DEAI.S pcm_u24le            PCM unsigned 24-bit little-endian
//  DEAI.S pcm_u32be            PCM unsigned 32-bit big-endian
//  DEAI.S pcm_u32le            PCM unsigned 32-bit little-endian
//  DEAI.S pcm_u8               PCM unsigned 8-bit
//  DEAIL. pcm_vidc             PCM Archimedes VIDC
//  D.AIL. qcelp                QCELP / PureVoice
//  D.AIL. qdm2                 QDesign Music Codec 2
//  D.AIL. qdmc                 QDesign Music
//  D.AIL. qoa                  QOA (Quite OK Audio)
//  DEAIL. ra_144               RealAudio 1.0 (14.4K) (decoders: real_144) (encoders: real_144)
//  D.AIL. ra_288               RealAudio 2.0 (28.8K) (decoders: real_288)
//  D.AI.S ralf                 RealAudio Lossless
//  D.AILS rka                  RKA (RK Audio)
//  DEAIL. roq_dpcm             DPCM id RoQ
//  DEAI.S s302m                SMPTE 302M
//  DEAIL. sbc                  SBC (low-complexity subband codec)
//  D.AIL. sdx2_dpcm            DPCM Squareroot-Delta-Exact
//  D.AI.S shorten              Shorten
//  D.AIL. sipr                 RealAudio SIPR / ACELP.NET
//  D.AIL. siren                Siren
//  D.AIL. smackaudio           Smacker audio (decoders: smackaud)
//  ..AIL. smv                  SMV (Selectable Mode Vocoder)
//  D.AIL. sol_dpcm             DPCM Sol
//  DEAI.. sonic                Sonic
//  .EAI.. sonicls              Sonic lossless
//  DEAIL. speex                Speex (decoders: speex libspeex) (encoders: libspeex)
//  D.A..S tak                  TAK (Tom's lossless Audio Kompressor)
//  DEA..S truehd               TrueHD
//  D.AIL. truespeech           DSP Group TrueSpeech
//  DEAI.S tta                  TTA (True Audio)
//  D.AIL. twinvq               VQF TwinVQ
//  D.AIL. vmdaudio             Sierra VMD audio
//  DEAIL. vorbis               Vorbis (decoders: vorbis libvorbis) (encoders: vorbis libvorbis)
//  D.AIL. wady_dpcm            DPCM Marble WADY
//  D.AI.S wavarc               Waveform Archiver
//  D.AI.. wavesynth            Wave synthesis pseudo-codec
//  DEAILS wavpack              WavPack
//  D.AIL. westwood_snd1        Westwood Audio (SND1) (decoders: ws_snd1)
//  D.AI.S wmalossless          Windows Media Audio Lossless
//  D.AIL. wmapro               Windows Media Audio 9 Professional
//  DEAIL. wmav1                Windows Media Audio 1
//  DEAIL. wmav2                Windows Media Audio 2
//  D.AIL. wmavoice             Windows Media Audio Voice
//  D.AIL. xan_dpcm             DPCM Xan
//  D.AIL. xma1                 Xbox Media Audio 1
//  D.AIL. xma2                 Xbox Media Audio 2
//  ..D... bin_data             binary data
//  ..D... dvd_nav_packet       DVD Nav packet
//  ..D... epg                  Electronic Program Guide
//  ..D... klv                  SMPTE 336M Key-Length-Value (KLV) metadata
//  ..D... lcevc                LCEVC (Low Complexity Enhancement Video Coding) / MPEG-5 LCEVC / MPEG-5 part 2
//  ..D... mpegts               raw MPEG-TS stream
//  ..D... otf                  OpenType font
//  ..D... scte_35              SCTE 35 Message Queue
//  ..D... smpte_2038           SMPTE ST 2038 VANC in MPEG-2 TS
//  ..D... timed_id3            timed ID3 metadata
//  ..D... ttf                  TrueType font
//  ..S... arib_caption         ARIB STD-B24 caption
//  DES... ass                  ASS (Advanced SSA) subtitle (decoders: ssa ass) (encoders: ssa ass)
//  DES... dvb_subtitle         DVB subtitles (decoders: dvbsub) (encoders: dvbsub)
//  ..S... dvb_teletext         DVB teletext
//  DES... dvd_subtitle         DVD subtitles (decoders: dvdsub) (encoders: dvdsub)
//  D.S... eia_608              EIA-608 closed captions (decoders: cc_dec)
//  D.S... hdmv_pgs_subtitle    HDMV Presentation Graphic Stream subtitles (decoders: pgssub)
//  ..S... hdmv_text_subtitle   HDMV Text subtitle
//  D.S... jacosub              JACOsub subtitle
//  D.S... microdvd             MicroDVD subtitle
//  DES... mov_text             MOV text
//  D.S... mpl2                 MPL2 subtitle
//  D.S... pjs                  PJS (Phoenix Japanimation Society) subtitle
//  D.S... realtext             RealText subtitle
//  D.S... sami                 SAMI subtitle
//  ..S... srt                  SubRip subtitle with embedded timing
//  ..S... ssa                  SSA (SubStation Alpha) subtitle
//  D.S... stl                  Spruce subtitle format
//  DES... subrip               SubRip subtitle (decoders: srt subrip) (encoders: srt subrip)
//  D.S... subviewer            SubViewer subtitle
//  D.S... subviewer1           SubViewer v1 subtitle
//  DES... text                 raw UTF-8 text
//  .ES... ttml                 Timed Text Markup Language
//  D.S... vplayer              VPlayer subtitle
//  DES... webvtt               WebVTT subtitle
//  DES... xsub                 XSUB

export enum FFmpegEncoder {
  AAC = 'aac',
  AC3 = 'ac3',
  AC3_FIXED = 'ac3_fixed',
  ADPCM_ADX = 'adpcm_adx',
  ADPCM_ARGO = 'adpcm_argo',
  ADPCM_G722 = 'adpcm_g722',
  ADPCM_G726 = 'adpcm_g726',
  ADPCM_G726LE = 'adpcm_g726le',
  ADPCM_IMA_ALP = 'adpcm_ima_alp',
  ADPCM_IMA_AMV = 'adpcm_ima_amv',
  ADPCM_IMA_APM = 'adpcm_ima_apm',
  ADPCM_IMA_QT = 'adpcm_ima_qt',
  ADPCM_IMA_SSI = 'adpcm_ima_ssi',
  ADPCM_IMA_WAV = 'adpcm_ima_wav',
  ADPCM_IMA_WS = 'adpcm_ima_ws',
  ADPCM_MS = 'adpcm_ms',
  ADPCM_SWF = 'adpcm_swf',
  ADPCM_YAMAHA = 'adpcm_yamaha',
  ALAC = 'alac',
  AMR_NB = 'amr_nb',
  ANULL = 'anull',
  APTX = 'aptx',
  APTX_HD = 'aptx_hd',
  COMFORTNOISE = 'comfortnoise',
  DCA = 'dca',
  EAC3 = 'eac3',
  FLAC = 'flac',
  G723_1 = 'g723_1',
  GSM = 'gsm',
  GSM_MS = 'gsm_ms',
  MLP = 'mlp',
  MP2 = 'mp2',
  MP2FIXED = 'mp2fixed',
  MP3 = 'libmp3lame',
  NELLYMOSER = 'nellymoser',
  OPUS = 'opus',
  PCM_ALAW = 'pcm_alaw',
  PCM_BLURAY = 'pcm_bluray',
  PCM_DVD = 'pcm_dvd',
  PCM_F32BE = 'pcm_f32be',
  PCM_F32LE = 'pcm_f32le',
  PCM_F64BE = 'pcm_f64be',
  PCM_F64LE = 'pcm_f64le',
  PCM_MULAW = 'pcm_mulaw',
  PCM_S16BE = 'pcm_s16be',
  PCM_S16BE_PLANAR = 'pcm_s16be_planar',
  PCM_S16LE = 'pcm_s16le',
  PCM_S16LE_PLANAR = 'pcm_s16le_planar',
  PCM_S24BE = 'pcm_s24be',
  PCM_S24DAUD = 'pcm_s24daud',
  PCM_S24LE = 'pcm_s24le',
  PCM_S24LE_PLANAR = 'pcm_s24le_planar',
  PCM_S32BE = 'pcm_s32be',
  PCM_S32LE = 'pcm_s32le',
  PCM_S32LE_PLANAR = 'pcm_s32le_planar',
  PCM_S64BE = 'pcm_s64be',
  PCM_S64LE = 'pcm_s64le',
  PCM_S8 = 'pcm_s8',
  PCM_S8_PLANAR = 'pcm_s8_planar',
  PCM_U16BE = 'pcm_u16be',
  PCM_U16LE = 'pcm_u16le',
  PCM_U24BE = 'pcm_u24be',
  PCM_U24LE = 'pcm_u24le',
  PCM_U32BE = 'pcm_u32be',
  PCM_U32LE = 'pcm_u32le',
  PCM_U8 = 'pcm_u8',
  PCM_VIDC = 'pcm_vidc',
  REAL_144 = 'real_144',
  ROQ_DPCM = 'roq_dpcm',
  S302M = 's302m',
  SBC = 'sbc',
  SONIC = 'sonic',
  SONICLS = 'sonicls',
  SPEEX = 'speex',
  TRUEHD = 'truehd',
  TTA = 'tta',
  VORBIS = 'vorbis',
  WAVPACK = 'wavpack',
  WMAV1 = 'wmav1',
  WMAV2 = 'wmav2'
}

export enum FFmpegDecoder {
  AAC = 'aac',
  AC3 = 'ac3',
  ADPCM_ADX = 'adpcm_adx',
  ADPCM_ARGO = 'adpcm_argo',
  ADPCM_CT = 'adpcm_ct',
  ADPCM_EA = 'adpcm_ea',
  ADPCM_G722 = 'adpcm_g722',
  ADPCM_G726 = 'adpcm_g726',
  ADPCM_G726LE = 'adpcm_g726le',
  ADPCM_IMA_ALP = 'adpcm_ima_alp',
  ADPCM_IMA_AMV = 'adpcm_ima_amv',
  ADPCM_IMA_APM = 'adpcm_ima_apm',
  ADPCM_IMA_QT = 'adpcm_ima_qt',
  ADPCM_IMA_SSI = 'adpcm_ima_ssi',
  ADPCM_IMA_WAV = 'adpcm_ima_wav',
  ADPCM_IMA_WS = 'adpcm_ima_ws',
  ADPCM_MS = 'adpcm_ms',
  ADPCM_SWF = 'adpcm_swf',
  ADPCM_YAMAHA = 'adpcm_yamaha',
  ALAC = 'alac',
  AMR_NB = 'amr_nb',
  ANULL = 'anull',
  APTX = 'aptx',
  APTX_HD = 'aptx_hd',
  COMFORTNOISE = 'comfortnoise',
  DCA = 'dca',
  EAC3 = 'eac3',
  FLAC = 'flac',
  G723_1 = 'g723_1',
  GSM = 'gsm',
  GSM_MS = 'gsm_ms',
  MLP = 'mlp',
  MP2 = 'mp2',
  MP3 = 'mp3',
  NELLYMOSER = 'nellymoser',
  OPUS = 'opus',
  PCM_ALAW = 'pcm_alaw',
  PCM_BLURAY = 'pcm_bluray',
  PCM_DVD = 'pcm_dvd',
  PCM_F32BE = 'pcm_f32be',
  PCM_F32LE = 'pcm_f32le',
  PCM_F64BE = 'pcm_f64be',
  PCM_F64LE = 'pcm_f64le',
  PCM_MULAW = 'pcm_mulaw',
  PCM_S16BE = 'pcm_s16be',
  PCM_S16BE_PLANAR = 'pcm_s16be_planar',
  PCM_S16LE = 'pcm_s16le',
  PCM_S16LE_PLANAR = 'pcm_s16le_planar',
  PCM_S24BE = 'pcm_s24be',
  PCM_S24DAUD = 'pcm_s24daud',
  PCM_S24LE = 'pcm_s24le',
  PCM_S24LE_PLANAR = 'pcm_s24le_planar',
  PCM_S32BE = 'pcm_s32be',
  PCM_S32LE = 'pcm_s32le',
  PCM_S32LE_PLANAR = 'pcm_s32le_planar',
  PCM_S64BE = 'pcm_s64be',
  PCM_S64LE = 'pcm_s64le',
  PCM_S8 = 'pcm_s8',
  PCM_S8_PLANAR = 'pcm_s8_planar',
  PCM_U16BE = 'pcm_u16be',
  PCM_U16LE = 'pcm_u16le',
  PCM_U24BE = 'pcm_u24be',
  PCM_U24LE = 'pcm_u24le',
  PCM_U32BE = 'pcm_u32be',
  PCM_U32LE = 'pcm_u32le',
  PCM_U8 = 'pcm_u8',
  PCM_VIDC = 'pcm_vidc',
  REAL_144 = 'real_144',
  ROQ_DPCM = 'roq_dpcm',
  S302M = 's302m',
  SBC = 'sbc',
  SONIC = 'sonic',
  SONICLS = 'sonicls',
  SPEEX = 'speex',
  TRUEHD = 'truehd',
  TTA = 'tta',
  VORBIS = 'vorbis',
  WAVPACK = 'wavpack',
  WMAV1 = 'wmav1',
  WMAV2 = 'wmav2'
}

export function parseEncoder(value: unknown): FFmpegEncoder {
  switch (value) {
    case FFmpegEncoder.AAC:
      return FFmpegEncoder.AAC;
    case FFmpegEncoder.AC3:
      return FFmpegEncoder.AC3;
    case FFmpegEncoder.AC3_FIXED:
      return FFmpegEncoder.AC3_FIXED;
    case FFmpegEncoder.ADPCM_ADX:
      return FFmpegEncoder.ADPCM_ADX;
    case FFmpegEncoder.ADPCM_ARGO:
      return FFmpegEncoder.ADPCM_ARGO;
    case FFmpegEncoder.ADPCM_G722:
      return FFmpegEncoder.ADPCM_G722;
    case FFmpegEncoder.ADPCM_G726:
      return FFmpegEncoder.ADPCM_G726;
    case FFmpegEncoder.ADPCM_G726LE:
      return FFmpegEncoder.ADPCM_G726LE;
    case FFmpegEncoder.ADPCM_IMA_ALP:
      return FFmpegEncoder.ADPCM_IMA_ALP;
    case FFmpegEncoder.ADPCM_IMA_AMV:
      return FFmpegEncoder.ADPCM_IMA_AMV;
    case FFmpegEncoder.ADPCM_IMA_APM:
      return FFmpegEncoder.ADPCM_IMA_APM;
    case FFmpegEncoder.ADPCM_IMA_QT:
      return FFmpegEncoder.ADPCM_IMA_QT;
    case FFmpegEncoder.ADPCM_IMA_SSI:
      return FFmpegEncoder.ADPCM_IMA_SSI;
    case FFmpegEncoder.ADPCM_IMA_WAV:
      return FFmpegEncoder.ADPCM_IMA_WAV;
    case FFmpegEncoder.ADPCM_IMA_WS:
      return FFmpegEncoder.ADPCM_IMA_WS;
    case FFmpegEncoder.ADPCM_MS:
      return FFmpegEncoder.ADPCM_MS;
    case FFmpegEncoder.ADPCM_SWF:
      return FFmpegEncoder.ADPCM_SWF;
    case FFmpegEncoder.ADPCM_YAMAHA:
      return FFmpegEncoder.ADPCM_YAMAHA;
    case FFmpegEncoder.ALAC:
      return FFmpegEncoder.ALAC;
    case FFmpegEncoder.AMR_NB:
      return FFmpegEncoder.AMR_NB;
    case FFmpegEncoder.ANULL:
      return FFmpegEncoder.ANULL;
    case FFmpegEncoder.APTX:
      return FFmpegEncoder.APTX;
    case FFmpegEncoder.APTX_HD:
      return FFmpegEncoder.APTX_HD;
    case FFmpegEncoder.COMFORTNOISE:
      return FFmpegEncoder.COMFORTNOISE;
    case FFmpegEncoder.DCA:
      return FFmpegEncoder.DCA;
    case FFmpegEncoder.EAC3:
      return FFmpegEncoder.EAC3;
    case FFmpegEncoder.FLAC:
      return FFmpegEncoder.FLAC;
    case FFmpegEncoder.G723_1:
      return FFmpegEncoder.G723_1;
    case FFmpegEncoder.GSM:
      return FFmpegEncoder.GSM;
    case FFmpegEncoder.GSM_MS:
      return FFmpegEncoder.GSM_MS;
    case FFmpegEncoder.MLP:
      return FFmpegEncoder.MLP;
    case FFmpegEncoder.MP2:
      return FFmpegEncoder.MP2;
    case FFmpegEncoder.MP2FIXED:
      return FFmpegEncoder.MP2FIXED;
    case FFmpegEncoder.MP3:
      return FFmpegEncoder.MP3;
    case FFmpegEncoder.NELLYMOSER:
      return FFmpegEncoder.NELLYMOSER;
    case FFmpegEncoder.OPUS:
      return FFmpegEncoder.OPUS;
    case FFmpegEncoder.PCM_ALAW:
      return FFmpegEncoder.PCM_ALAW;
    case FFmpegEncoder.PCM_BLURAY:
      return FFmpegEncoder.PCM_BLURAY;
    case FFmpegEncoder.PCM_DVD:
      return FFmpegEncoder.PCM_DVD;
    case FFmpegEncoder.PCM_F32BE:
      return FFmpegEncoder.PCM_F32BE;
    case FFmpegEncoder.PCM_F32LE:
      return FFmpegEncoder.PCM_F32LE;
    case FFmpegEncoder.PCM_F64BE:
      return FFmpegEncoder.PCM_F64BE;
    case FFmpegEncoder.PCM_F64LE:
      return FFmpegEncoder.PCM_F64LE;
    case FFmpegEncoder.PCM_MULAW:
      return FFmpegEncoder.PCM_MULAW;
    case FFmpegEncoder.PCM_S16BE:
      return FFmpegEncoder.PCM_S16BE;
    case FFmpegEncoder.PCM_S16BE_PLANAR:
      return FFmpegEncoder.PCM_S16BE_PLANAR;
    case FFmpegEncoder.PCM_S16LE:
      return FFmpegEncoder.PCM_S16LE;
    case FFmpegEncoder.PCM_S16LE_PLANAR:
      return FFmpegEncoder.PCM_S16LE_PLANAR;
    case FFmpegEncoder.PCM_S24BE:
      return FFmpegEncoder.PCM_S24BE;
    case FFmpegEncoder.PCM_S24DAUD:
      return FFmpegEncoder.PCM_S24DAUD;
    case FFmpegEncoder.PCM_S24LE:
      return FFmpegEncoder.PCM_S24LE;
    case FFmpegEncoder.PCM_S24LE_PLANAR:
      return FFmpegEncoder.PCM_S24LE_PLANAR;
    case FFmpegEncoder.PCM_S32BE:
      return FFmpegEncoder.PCM_S32BE;
    case FFmpegEncoder.PCM_S32LE:
      return FFmpegEncoder.PCM_S32LE;
    case FFmpegEncoder.PCM_S32LE_PLANAR:
      return FFmpegEncoder.PCM_S32LE_PLANAR;
    case FFmpegEncoder.PCM_S64BE:
      return FFmpegEncoder.PCM_S64BE;
    case FFmpegEncoder.PCM_S64LE:
      return FFmpegEncoder.PCM_S64LE;
    case FFmpegEncoder.PCM_S8:
      return FFmpegEncoder.PCM_S8;
    case FFmpegEncoder.PCM_S8_PLANAR:
      return FFmpegEncoder.PCM_S8_PLANAR;
    case FFmpegEncoder.PCM_U16BE:
      return FFmpegEncoder.PCM_U16BE;
    case FFmpegEncoder.PCM_U16LE:
      return FFmpegEncoder.PCM_U16LE;
    case FFmpegEncoder.PCM_U24BE:
      return FFmpegEncoder.PCM_U24BE;
    case FFmpegEncoder.PCM_U24LE:
      return FFmpegEncoder.PCM_U24LE;
    case FFmpegEncoder.PCM_U32BE:
      return FFmpegEncoder.PCM_U32BE;
    case FFmpegEncoder.PCM_U32LE:
      return FFmpegEncoder.PCM_U32LE;
    case FFmpegEncoder.PCM_U8:
      return FFmpegEncoder.PCM_U8;
    case FFmpegEncoder.PCM_VIDC:
      return FFmpegEncoder.PCM_VIDC;
    case FFmpegEncoder.REAL_144:
      return FFmpegEncoder.REAL_144;
    case FFmpegEncoder.ROQ_DPCM:
      return FFmpegEncoder.ROQ_DPCM;
    case FFmpegEncoder.S302M:
      return FFmpegEncoder.S302M;
    case FFmpegEncoder.SBC:
      return FFmpegEncoder.SBC;
    case FFmpegEncoder.SONIC:
      return FFmpegEncoder.SONIC;
    case FFmpegEncoder.SONICLS:
      return FFmpegEncoder.SONICLS;
    case FFmpegEncoder.SPEEX:
      return FFmpegEncoder.SPEEX;
    case FFmpegEncoder.TRUEHD:
      return FFmpegEncoder.TRUEHD;
    case FFmpegEncoder.TTA:
      return FFmpegEncoder.TTA;
    case FFmpegEncoder.VORBIS:
      return FFmpegEncoder.VORBIS;
    case FFmpegEncoder.WAVPACK:
      return FFmpegEncoder.WAVPACK;
    case FFmpegEncoder.WMAV1:
      return FFmpegEncoder.WMAV1;
    case FFmpegEncoder.WMAV2:
      return FFmpegEncoder.WMAV2;
    default:
      throw new Error(`Unknown encoder: ${value}`);
  }
}

export function parseDecoder(value: unknown): FFmpegDecoder {
  switch (value) {
    case FFmpegDecoder.AAC:
      return FFmpegDecoder.AAC;
    case FFmpegDecoder.AC3:
      return FFmpegDecoder.AC3;
    case FFmpegDecoder.ADPCM_ADX:
      return FFmpegDecoder.ADPCM_ADX;
    case FFmpegDecoder.ADPCM_ARGO:
      return FFmpegDecoder.ADPCM_ARGO;
    case FFmpegDecoder.ADPCM_CT:
      return FFmpegDecoder.ADPCM_CT;
    case FFmpegDecoder.ADPCM_EA:
      return FFmpegDecoder.ADPCM_EA;
    case FFmpegDecoder.ADPCM_G722:
      return FFmpegDecoder.ADPCM_G722;
    case FFmpegDecoder.ADPCM_G726:
      return FFmpegDecoder.ADPCM_G726;
    case FFmpegDecoder.ADPCM_G726LE:
      return FFmpegDecoder.ADPCM_G726LE;
    case FFmpegDecoder.ADPCM_IMA_ALP:
      return FFmpegDecoder.ADPCM_IMA_ALP;
    case FFmpegDecoder.ADPCM_IMA_AMV:
      return FFmpegDecoder.ADPCM_IMA_AMV;
    case FFmpegDecoder.ADPCM_IMA_APM:
      return FFmpegDecoder.ADPCM_IMA_APM;
    case FFmpegDecoder.ADPCM_IMA_QT:
      return FFmpegDecoder.ADPCM_IMA_QT;
    case FFmpegDecoder.ADPCM_IMA_SSI:
      return FFmpegDecoder.ADPCM_IMA_SSI;
    case FFmpegDecoder.ADPCM_IMA_WAV:
      return FFmpegDecoder.ADPCM_IMA_WAV;
    case FFmpegDecoder.ADPCM_IMA_WS:
      return FFmpegDecoder.ADPCM_IMA_WS;
    case FFmpegDecoder.ADPCM_MS:
      return FFmpegDecoder.ADPCM_MS;
    case FFmpegDecoder.ADPCM_SWF:
      return FFmpegDecoder.ADPCM_SWF;
    case FFmpegDecoder.ADPCM_YAMAHA:
      return FFmpegDecoder.ADPCM_YAMAHA;
    case FFmpegDecoder.ALAC:
      return FFmpegDecoder.ALAC;
    case FFmpegDecoder.AMR_NB:
      return FFmpegDecoder.AMR_NB;
    case FFmpegDecoder.ANULL:
      return FFmpegDecoder.ANULL;
    case FFmpegDecoder.APTX:
      return FFmpegDecoder.APTX;
    case FFmpegDecoder.APTX_HD:
      return FFmpegDecoder.APTX_HD;
    case FFmpegDecoder.COMFORTNOISE:
      return FFmpegDecoder.COMFORTNOISE;
    case FFmpegDecoder.DCA:
      return FFmpegDecoder.DCA;
    case FFmpegDecoder.EAC3:
      return FFmpegDecoder.EAC3;
    case FFmpegDecoder.FLAC:
      return FFmpegDecoder.FLAC;
    case FFmpegDecoder.G723_1:
      return FFmpegDecoder.G723_1;
    case FFmpegDecoder.GSM:
      return FFmpegDecoder.GSM;
    case FFmpegDecoder.GSM_MS:
      return FFmpegDecoder.GSM_MS;
    case FFmpegDecoder.MLP:
      return FFmpegDecoder.MLP;
    case FFmpegDecoder.MP2:
      return FFmpegDecoder.MP2;
    case FFmpegDecoder.MP3:
      return FFmpegDecoder.MP3;
    case FFmpegDecoder.NELLYMOSER:
      return FFmpegDecoder.NELLYMOSER;
    case FFmpegDecoder.OPUS:
      return FFmpegDecoder.OPUS;
    case FFmpegDecoder.PCM_ALAW:
      return FFmpegDecoder.PCM_ALAW;
    case FFmpegDecoder.PCM_BLURAY:
      return FFmpegDecoder.PCM_BLURAY;
    case FFmpegDecoder.PCM_DVD:
      return FFmpegDecoder.PCM_DVD;
    case FFmpegDecoder.PCM_F32BE:
      return FFmpegDecoder.PCM_F32BE;
    case FFmpegDecoder.PCM_F32LE:
      return FFmpegDecoder.PCM_F32LE;
    case FFmpegDecoder.PCM_F64BE:
      return FFmpegDecoder.PCM_F64BE;
    case FFmpegDecoder.PCM_F64LE:
      return FFmpegDecoder.PCM_F64LE;
    case FFmpegDecoder.PCM_MULAW:
      return FFmpegDecoder.PCM_MULAW;
    case FFmpegDecoder.PCM_S16BE:
      return FFmpegDecoder.PCM_S16BE;
    case FFmpegDecoder.PCM_S16BE_PLANAR:
      return FFmpegDecoder.PCM_S16BE_PLANAR;
    case FFmpegDecoder.PCM_S16LE:
      return FFmpegDecoder.PCM_S16LE;
    case FFmpegDecoder.PCM_S16LE_PLANAR:
      return FFmpegDecoder.PCM_S16LE_PLANAR;
    case FFmpegDecoder.PCM_S24BE:
      return FFmpegDecoder.PCM_S24BE;
    case FFmpegDecoder.PCM_S24DAUD:
      return FFmpegDecoder.PCM_S24DAUD;
    case FFmpegDecoder.PCM_S24LE:
      return FFmpegDecoder.PCM_S24LE;
    case FFmpegDecoder.PCM_S24LE_PLANAR:
      return FFmpegDecoder.PCM_S24LE_PLANAR;
    case FFmpegDecoder.PCM_S32BE:
      return FFmpegDecoder.PCM_S32BE;
    case FFmpegDecoder.PCM_S32LE:
      return FFmpegDecoder.PCM_S32LE;
    case FFmpegDecoder.PCM_S32LE_PLANAR:
      return FFmpegDecoder.PCM_S32LE_PLANAR;
    case FFmpegDecoder.PCM_S64BE:
      return FFmpegDecoder.PCM_S64BE;
    case FFmpegDecoder.PCM_S64LE:
      return FFmpegDecoder.PCM_S64LE;
    case FFmpegDecoder.PCM_S8:
      return FFmpegDecoder.PCM_S8;
    case FFmpegDecoder.PCM_S8_PLANAR:
      return FFmpegDecoder.PCM_S8_PLANAR;
    case FFmpegDecoder.PCM_U16BE:
      return FFmpegDecoder.PCM_U16BE;
    case FFmpegDecoder.PCM_U16LE:
      return FFmpegDecoder.PCM_U16LE;
    case FFmpegDecoder.PCM_U24BE:
      return FFmpegDecoder.PCM_U24BE;
    case FFmpegDecoder.PCM_U24LE:
      return FFmpegDecoder.PCM_U24LE;
    case FFmpegDecoder.PCM_U32BE:
      return FFmpegDecoder.PCM_U32BE;
    case FFmpegDecoder.PCM_U32LE:
      return FFmpegDecoder.PCM_U32LE;
    case FFmpegDecoder.PCM_U8:
      return FFmpegDecoder.PCM_U8;
    case FFmpegDecoder.PCM_VIDC:
      return FFmpegDecoder.PCM_VIDC;
    case FFmpegDecoder.REAL_144:
      return FFmpegDecoder.REAL_144;
    case FFmpegDecoder.ROQ_DPCM:
      return FFmpegDecoder.ROQ_DPCM;
    case FFmpegDecoder.S302M:
      return FFmpegDecoder.S302M;
    case FFmpegDecoder.SBC:
      return FFmpegDecoder.SBC;
    case FFmpegDecoder.SONIC:
      return FFmpegDecoder.SONIC;
    case FFmpegDecoder.SONICLS:
      return FFmpegDecoder.SONICLS;
    case FFmpegDecoder.SPEEX:
      return FFmpegDecoder.SPEEX;
    case FFmpegDecoder.TRUEHD:
      return FFmpegDecoder.TRUEHD;
    case FFmpegDecoder.TTA:
      return FFmpegDecoder.TTA;
    case FFmpegDecoder.VORBIS:
      return FFmpegDecoder.VORBIS;
    case FFmpegDecoder.WAVPACK:
      return FFmpegDecoder.WAVPACK;
    case FFmpegDecoder.WMAV1:
      return FFmpegDecoder.WMAV1;
    case FFmpegDecoder.WMAV2:
      return FFmpegDecoder.WMAV2;
    default:
      throw new Error(`Unknown decoder: ${value}`);
  }
}
