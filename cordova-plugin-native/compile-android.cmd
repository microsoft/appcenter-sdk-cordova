@echo off
cd src\android
rmdir libs obj /S /Q
ndk-build.cmd
cd ..\..