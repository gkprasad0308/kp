package com.example;

import org.hibernate.cfg.ImprovedNamingStrategy;

/**
 * - Appends prefix to table name </br>
 * - Generates table name with _ if @Table not mentioned
 *
 * @author vayyalaraju
 * @since Jul 31, 2015
 * @copyright Copyright (c) 2015 - PSTechnology - All Rights Reserved
 */
public class Backup extends ImprovedNamingStrategy
{

    /**
     * Contains 
     */
    private static final long serialVersionUID = 1L;
    private static final String PREFIX = "ttx_"; //@TODO - From Application property

    /**
     * Transforms class names to table names by using the described naming
     * conventions.
     * 
     * @param className
     * @return The constructed table name.
     */
    @Override
    public String classToTableName(String className)
    {
        EntityTableNameMappingEnum mappingEnum = EntityTableNameMappingEnum.fromSimpleName(className);
        if(mappingEnum != null)
        {
            return addPrefix(mappingEnum.getTableName());
        }
        String tableNameInSingularForm = super.classToTableName(className);
        return addPrefix(tableNameInSingularForm);
    }

    private String addPrefix(String tableNameInSingularForm)
    {
        StringBuilder pluralForm = new StringBuilder();
        pluralForm.append(PREFIX);
        pluralForm.append(tableNameInSingularForm);
        return pluralForm.toString();
    }
    
    @Override
    public String foreignKeyColumnName(String propertyName, String propertyEntityName, String propertyTableName, String referencedColumnName) {
        String s = super.foreignKeyColumnName(propertyName, propertyEntityName, propertyTableName, referencedColumnName);
        return s.endsWith("_oid") ? s : s + "_oid";
    }

    @Override
    public String collectionTableName(String ownerEntity,
    String ownerEntityTable, String associatedEntity,
    String associatedEntityTable, String propertyName)
    {
        JoinTableNameMappingEnum mappingEnum = JoinTableNameMappingEnum.fromSimpleName(ownerEntity,associatedEntity);
        if(mappingEnum != null)
        {
            return addPrefix(mappingEnum.getTableName());
        }
        String jointableName = super.collectionTableName(ownerEntity, ownerEntityTable,
        associatedEntity, associatedEntityTable, propertyName);
        return addPrefix(jointableName);
    }

    @Override
    public String logicalCollectionTableName(String tableName,
    String ownerEntityTable, String associatedEntityTable, String propertyName)
    {
        String tableNameStr = super.logicalCollectionTableName(tableName, ownerEntityTable,
        associatedEntityTable, propertyName);
        return addPrefix(tableNameStr);
    }
    
    
    
    
}