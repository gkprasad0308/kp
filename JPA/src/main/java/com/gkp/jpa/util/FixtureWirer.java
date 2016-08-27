package com.gkp.jpa.util;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.gkp.jpa.HelloJpaApplication;

public class FixtureWirer
{
    public static ApplicationContext context;

    static
    {
        context = new AnnotationConfigApplicationContext(HelloJpaApplication.class);
    }

   

    public static <T> T getBean(Class<T> beanClass)
    {
        return (T) context.getBean(beanClass);
    }

}
