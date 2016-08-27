package com.example;

import com.example.domain.OrganizationUnit;
import com.example.domain.Role;

/**
 * JoinTableNameMappingEnum
 *
 * @author vayyalaraju
 * @since Aug 20, 2015
 * @copyright Copyright (c) 2015 - PSTechnology - All Rights Reserved
 */
public enum JoinTableNameMappingEnum
{
    
    MAP_1(OrganizationUnit.class,Role.class,"ORG_UNIT_ROLE_X"),
    MAP_2(Role.class,OrganizationUnit.class,"ORG_UNIT_ROLE_X");
    
    private Class<?> className;
    
    private Class<?> associatedClassName;
    
    private String tableName;

    // CONSTRUCTING

    private JoinTableNameMappingEnum( Class<?> className, Class<?> associatedClassName, String tableName)
    {
        setClassName(className);
        setAssociatedClassName(associatedClassName);
        setTableName(tableName);
    }

    public Class<?> getClassName()
    {
        return className;
    }

    public void setClassName(Class<?> className)
    {
        this.className = className;
    }

    public Class<?> getAssociatedClassName()
    {
        return associatedClassName;
    }

    public void setAssociatedClassName(Class<?> associatedClassName)
    {
        this.associatedClassName = associatedClassName;
    }

    public String getTableName()
    {
        return tableName;
    }

    public void setTableName(String tableName)
    {
        this.tableName = tableName;
    }
    
    // CONVENIENCE
    
    public String getClassSimpleName()
    {
        return className.getSimpleName();
    }
    
    public String getAssociatedClassSimpleName()
    {
        return associatedClassName.getSimpleName();
    }
    
    public static JoinTableNameMappingEnum fromSimpleName(String classSimpleName, String assoscClassSimpleName)
    {
        for (JoinTableNameMappingEnum anEnum : values())
        {
            if (anEnum.getClassName().getName().equalsIgnoreCase(classSimpleName) 
                     && anEnum.getAssociatedClassName().getName().equalsIgnoreCase(assoscClassSimpleName))
            {
                return anEnum;
            }
        }
        return null;
    }
}
