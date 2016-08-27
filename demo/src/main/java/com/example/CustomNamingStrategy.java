package com.example;

import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.naming.ImplicitEntityNameSource;
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

	private String addPrefix(String tableNameInSingularForm) {
		StringBuilder pluralForm = new StringBuilder();
		pluralForm.append(PREFIX);
		pluralForm.append(tableNameInSingularForm);
		return pluralForm.toString();
	}

}