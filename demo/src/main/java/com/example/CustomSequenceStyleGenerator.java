package com.example;

import java.util.Properties;

import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.relational.QualifiedName;
import org.hibernate.boot.model.relational.QualifiedNameParser;
import org.hibernate.dialect.Dialect;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;
import org.hibernate.id.enhanced.SequenceStyleGenerator;
import org.hibernate.internal.util.config.ConfigurationHelper;

/**
 * CustomSequenceStyleGenerator
 *
 * @author vayyalaraju
 * @since Aug 5, 2015
 * @copyright Copyright (c) 2015 - PSTechnology - All Rights Reserved
 */
public class CustomSequenceStyleGenerator extends SequenceStyleGenerator
{

   
    @Override
    protected QualifiedName determineSequenceName(Properties params, Dialect dialect, JdbcEnvironment jdbcEnv) {
        final String sequencePerEntitySuffix = ConfigurationHelper.getString( CONFIG_SEQUENCE_PER_ENTITY_SUFFIX, params, DEF_SEQUENCE_SUFFIX );
        
        
        EntityTableNameMappingEnum mappingEnum = EntityTableNameMappingEnum.fromSimpleName(params.getProperty( JPA_ENTITY_NAME ));
        String tableName = (mappingEnum != null)? mappingEnum.getTableName(): camelCaseToUnderscore(params.getProperty( JPA_ENTITY_NAME )); 
       
        // JPA_ENTITY_NAME value honors <class ... entity-name="..."> (HBM) and @Entity#name (JPA) overrides.
        String defaultSequenceName = ConfigurationHelper.getBoolean( CONFIG_PREFER_SEQUENCE_PER_ENTITY, params, false )
                ? "ttx_"+ tableName + sequencePerEntitySuffix
                : DEF_SEQUENCE_NAME;

        final String sequenceName = ConfigurationHelper.getString( SEQUENCE_PARAM, params, defaultSequenceName );
        if ( sequenceName.contains( "." ) ) {
            return QualifiedNameParser.INSTANCE.parse( sequenceName );
        }
        else {
            // todo : need to incorporate implicit catalog and schema names
            final Identifier catalog = jdbcEnv.getIdentifierHelper().toIdentifier(
                    ConfigurationHelper.getString( CATALOG, params )
            );
            final Identifier schema =  jdbcEnv.getIdentifierHelper().toIdentifier(
                    ConfigurationHelper.getString( SCHEMA, params )
            );
            return new QualifiedNameParser.NameParts(
                    catalog,
                    schema,
                    jdbcEnv.getIdentifierHelper().toIdentifier( sequenceName )
            );
        }
    }
    
    private String camelCaseToUnderscore(String name)
    {
        
        return  name.replaceAll("(.)(\\p{Upper})", "$1_$2").toLowerCase();
        
    }
}
