#!/bin/bash

PLATFORMPATH="/Applications/Xcode.app/Contents/Developer/Platforms"
TOOLSPATH="/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin"
export LIBNAME="mylib"
export SRC_ROOT="../common/mylib"
IPHONEOS_DEPLOYMENT_TARGET="8.0"
pwd=`pwd`
TEMP_DIR="$pwd/temp"
OUTPUT_DIR="$pwd/libs"
HEADERS_DIR="$OUTPUT_DIR/headers"

LIPO_INPUTS=""

findLatestSDKVersion()
{
    sdks=`ls $PLATFORMPATH/$1.platform/Developer/SDKs`
    arr=()
    for sdk in $sdks
    do
       arr[${#arr[@]}]=$sdk
    done

    # Last item will be the current SDK, since it is alpha ordered
    count=${#arr[@]}
    if [ $count -gt 0 ]; then
       sdk=${arr[$count-1]:${#1}}
       num=`expr ${#sdk}-4`
       SDKVERSION=${sdk:0:$num}
    else
       SDKVERSION="8.0"
    fi
}


buildit()
{
    target=$1
    hosttarget=$1
    platform=$2

    if [[ $hosttarget == "x86_64" ]]; then
        hostarget="i386"
    elif [[ $hosttarget == "arm64" ]]; then
        hosttarget="arm"
    fi

    export ARCH="$hosttarget"

    export CC="$(xcrun -sdk iphoneos -find clang)"
    #CPP="$CC -E"
    export CFLAGS="-arch ${target} -isysroot $PLATFORMPATH/$platform.platform/Developer/SDKs/$platform$SDKVERSION.sdk -miphoneos-version-min=$SDKVERSION"
    export AR=$(xcrun -sdk iphoneos -find ar)
    export RANLIB=$(xcrun -sdk iphoneos -find ranlib)
    #CPPFLAGS="-arch ${target}  -isysroot $PLATFORMPATH/$platform.platform/Developer/SDKs/$platform$SDKVERSION.sdk -miphoneos-version-min=$SDKVERSION"
    export LDFLAGS="-arch ${target} -isysroot $PLATFORMPATH/$platform.platform/Developer/SDKs/$platform$SDKVERSION.sdk"    

    export SRC_PATH="$TEMP_DIR"
    export TARGET_PATH="temp/$target"
    export TARGET_DIR="$pwd/$TARGET_PATH"

    make
    make clean

    mkdir -p $TARGET_DIR

    LIB_FILENAME="$ARCH-$LIBNAME.a"

    mv $LIB_FILENAME $TARGET_DIR
    LIPO_INPUTS="$LIPO_INPUTS $TARGET_DIR/$LIB_FILENAME" 
    
}
mkdir -p $TEMP_DIR $HEADERS_DIR
cp `find $SRC_ROOT -type f \( -name "*.c" -or -name "*.h" \)` $TEMP_DIR

findLatestSDKVersion iPhoneOS

buildit armv7 iPhoneOS
buildit armv7s iPhoneOS
buildit arm64 iPhoneOS
buildit i386 iPhoneSimulator
buildit x86_64 iPhoneSimulator

LIPO=$(xcrun -sdk iphoneos -find lipo)
$LIPO -create $LIPO_INPUTS -output $OUTPUT_DIR/lib$LIBNAME.a

mv $TEMP_DIR/*.h $HEADERS_DIR

rm -Rf $TEMP_DIR