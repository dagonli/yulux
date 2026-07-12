package com.yulux;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.yulux", annotationClass = Mapper.class)
public class YuluxApplication {

    public static void main(String[] args) {
        SpringApplication.run(YuluxApplication.class, args);
    }
}
