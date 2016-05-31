package com.gkp.jpa.scheduling.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class TestJob extends QuartzJobBean{
	
	

	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
		JobKey jobKey = context.getJobDetail().getKey();
		Long startTime = System.currentTimeMillis();
		System.out.println("Job Started @@@@@@@@ JobName:"+jobKey.getName()+"  Group Name: "+jobKey.getGroup());
		
		try{
			
		}catch(Exception ex){
			
		}finally{
			Long endTime = System.currentTimeMillis();
			Long processingTime = endTime-startTime;
			System.out.println("Job Completed @@@@@@@@ JobName:"+jobKey.getName()+"  Group Name: "+jobKey.getGroup()+"  Processing time: "+processingTime);
		}
		
	}
	
	public void executeJob(JobExecutionContext context) throws Exception{
		
	}
	
	public String getName(){
		return "Test";
	}
	
	public String getGroup(){
		return "Test";
	}
	

}
