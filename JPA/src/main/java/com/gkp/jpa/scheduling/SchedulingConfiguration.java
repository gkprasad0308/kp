package com.gkp.jpa.scheduling;

import java.io.IOException;
import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;

import com.gkp.jpa.scheduling.job.TestJob;

@Configuration
@ConditionalOnProperty(name = "quartz.enabled")
public class SchedulingConfiguration {
	
	@Bean
	public SchedulerFactoryBean   schedulerFactoryBean(DataSource dataSource) throws IOException{
		System.out.println("Entered into factory bean @@@@@@@@@@@@@@@@@@@");
		SchedulerFactoryBean schedulerFactoryBean = new SchedulerFactoryBean();
		schedulerFactoryBean.setDataSource(dataSource);
		schedulerFactoryBean.setQuartzProperties(quartzProperties());
		schedulerFactoryBean.setStartupDelay(5);
		schedulerFactoryBean.setAutoStartup(true);
		schedulerFactoryBean.setTriggers(simpleTriggerFactoryBean().getObject());
		return schedulerFactoryBean;
	}
	
	@Bean
	public SimpleTriggerFactoryBean simpleTriggerFactoryBean(){
		System.out.println("Entered into trigger bean @@@@@@@@@@@@@@@@@@@");
		SimpleTriggerFactoryBean simpleTriggerFactoryBean = new SimpleTriggerFactoryBean();
		simpleTriggerFactoryBean.setJobDetail(jobDetailFactoryBean().getObject());
		simpleTriggerFactoryBean.setStartDelay(30);
		simpleTriggerFactoryBean.setRepeatInterval(200000);
		return simpleTriggerFactoryBean;
	}

	@Bean
	public JobDetailFactoryBean jobDetailFactoryBean() {
		System.out.println("Entered into job bean @@@@@@@@@@@@@@@@@@@");
		JobDetailFactoryBean jobDetailFactoryBean = new JobDetailFactoryBean();
		jobDetailFactoryBean.setJobClass(TestJob.class);
		jobDetailFactoryBean.setName("Test");
		jobDetailFactoryBean.setGroup("Test");
		return jobDetailFactoryBean;
	}
	
	@Bean
    public Properties quartzProperties() throws IOException {
        PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
        propertiesFactoryBean.setLocation(new ClassPathResource("/quartz.properties"));
        propertiesFactoryBean.afterPropertiesSet();
        return propertiesFactoryBean.getObject();
    }

}
