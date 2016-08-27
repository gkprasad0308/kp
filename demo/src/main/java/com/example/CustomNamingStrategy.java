package com.example;

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
			return toIdentifier(addPrefix(super.determinePrimaryTableName(source).getText()),
					source.getBuildingContext());
		}
	}
	
	
	
	@Override
	public Identifier determineJoinTableName(ImplicitJoinTableNameSource source) {
		//System.out.println("getOwningPhysicalTableName "+source.getOwningPhysicalTableName());
		//System.out.println("getNonOwningPhysicalTableName "+source.getNonOwningPhysicalTableName());
		//System.out.println("getOwningEntityNaming "+source.getOwningEntityNaming().getClassName());
		//System.out.println("getNonOwningEntityNaming "+source.getNonOwningEntityNaming().getClassName());
		//System.out.println("getAssociationOwningAttributePath "+source.getAssociationOwningAttributePath());
		JoinTableNameMappingEnum mappingEnum = JoinTableNameMappingEnum.fromSimpleName(source.getOwningEntityNaming().getClassName(),source.getNonOwningEntityNaming().getClassName());
        if(mappingEnum != null)
        {
        	//System.out.println("returned join table name is: "+toIdentifier(addPrefix(mappingEnum.getTableName()), source.getBuildingContext()).getText());
        	return toIdentifier(addPrefix(mappingEnum.getTableName()), source.getBuildingContext());
        }else{
        	//System.out.println("returned join table name is: "+super.determineJoinTableName(source).getText());
        	return super.determineJoinTableName(source);
        	
        }
	}



	//User foreignkey constraints
	@Override
	public Identifier determineForeignKeyName(ImplicitForeignKeyNameSource source) {
		//System.out.println("getReferencedTableName "+source.getReferencedTableName().getText());
		//System.out.println("getTableName "+source.getTableName().getText());
		//System.out.println("getReferencedColumnNames "+source.getReferencedColumnNames().size());
		//System.out.println("getReferencedColumnNames "+source.getReferencedTableName().getCanonicalName());
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

}