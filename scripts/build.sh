#!/bin/bash

# 编译
npm run build | tee ../build/build.txt
error_count=`cat ../build/build.txt | grep ERROR | wc -l`
if [ $error_count != "0"  ] ; then
    exit -1
fi

# 打包
cp -R ../resources ../statics/ && tar czvf ../build/nebula_fe.tar.gz ../statics ../templates

