package com.example;

import java.util.Locale;

import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.naming.ImplicitEntityNameSource;
import org.hibernate.boot.model.naming.ImplicitForeignKeyNameSource;
import org.hibernate.boot.model.naming.ImplicitJoinColumnNameSource;
import org.hibernate.boot.model.naming.ImplicitJoinTableNameSource;
import org.hibernate.boot.model.naming.ImplicitNamingStrategyJpaCompliantImpl;

public class CustomNamingStrategy extends ImplicitNamingStrategyJpaCompliantImpl {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final String PREFIX = "ttx_";

	@Override
	public Identifier determinePrimaryTableName(ImplicitEntityNameSource source) {
		EntityTableNameMappingEnum mappingEnum = EntityTableNameMappingEnum
				.fromSimpleName(source.getEntityNaming().getJpaEntityName());

		if (mappingEnum != null) {
			return toIdentifier(addPrefix(mappingEnum.getTableName()), source.getBuildingContext());
		} else {
			return toIdentifier(addPrefix(addUnderscores(super.determinePrimaryTableName(source).getText())),
					source.getBuildingContext());
		}
	}
	
	
	
	@Override
	public Identifier determineJoinTableName(ImplicitJoinTableNameSource source) {
		JoinTableNameMappingEnum mappingEnum = JoinTableNameMappingEnum.fromSimpleName(source.getOwningEntityNaming().getClassName(),source.getNonOwningEntityNaming().getClassName());
        if(mappingEnum != null)
        {
        	return toIdentifier(addPrefix(mappingEnum.getTableName()), source.getBuildingContext());
        }else{
        	return super.determineJoinTableName(source);
        	
        }
	}



	//User foreignkey constraints
	@Override
	public Identifier determineForeignKeyName(ImplicitForeignKeyNameSource source) {
		return super.determineForeignKeyName(source);
	}

	

	@Override
	public Identifier determineJoinColumnName(ImplicitJoinColumnNameSource source) {
		return toIdentifier(source.getAttributePath()+"_oid", source.getBuildingContext());
	}


	private String addPrefix(String tableNameInSingularForm) {
		StringBuilder pluralForm = new StringBuilder();
		pluralForm.append(PREFIX);
		pluralForm.append(tableNameInSingularForm);
		return pluralForm.toString();
	}
	
	private String addUnderscores(String name) {
		StringBuilder buf = new StringBuilder( name.replace('.', '_') );
		for (int i=1; i<buf.length()-1; i++) {
			if (
				Character.isLowerCase( buf.charAt(i-1) ) &&
				Character.isUpperCase( buf.charAt(i) ) &&
				Character.isLowerCase( buf.charAt(i+1) )
			) {
				buf.insert(i++, '_');
			}
		}
		return buf.toString().toLowerCase(Locale.ROOT);
	}

}