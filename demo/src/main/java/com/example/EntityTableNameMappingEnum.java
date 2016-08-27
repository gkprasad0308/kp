package com.example;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.example.domain.Employee;

public enum EntityTableNameMappingEnum {
	MAP_1(Employee.class, "EMP");

	// INSTANCE VARIABLES
	private Class<?> className;
	private String tableName;

	// CONSTRUCTING
	private EntityTableNameMappingEnum(Class<?> className, String tableName) {
		setClassName(className);
		setTableName(tableName);
	}

	// ACCESSING
	public Class<?> getClassName() {
		return className;
	}

	public void setClassName(Class<?> className) {
		this.className = className;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	// CONVENIENCE

	public String getName() {
		return className.getName();
	}

	public String getSimpleName() {
		return className.getSimpleName();
	}

	// MARSHALLING

	@Override
	public String toString() {
		return getName();
	}

	public static EntityTableNameMappingEnum fromSimpleName(String simpleName) {
		for (EntityTableNameMappingEnum anEnum : values()) {
			if (anEnum.getSimpleName().equalsIgnoreCase(simpleName)) {
				return anEnum;
			}
		}
		return null;
	}

	public static List<String> getAllEnumsAsTextId() {
		List<String> result = new ArrayList<String>();

		for (EntityTableNameMappingEnum anEnum : EntityTableNameMappingEnum.values()) {
			result.add(anEnum.getName());
		}
		Collections.sort(result);

		return result;
	}

}
