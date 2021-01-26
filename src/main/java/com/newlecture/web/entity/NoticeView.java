package com.newlecture.web.entity;

import java.util.Date;

import com.newlecture.web.entity.Notice;

public class NoticeView extends Notice{
	private String writerName;
	private int cmtCount;
	
	public NoticeView() {
		this(0,null,null,null,null,0,null,null,0);
	}

	public NoticeView(int id, String title, String writerId, String content, Date regdate, int hit, String files,String writerName, int cmtCount) {
		super(id, title, writerId, content, regdate, hit, files);
		this.writerName = writerName;
		this.cmtCount = cmtCount;
	}
	
	

	public String getWriterName() {
		return writerName;
	}

	public void setWriterName(String writerName) {
		this.writerName = writerName;
	}

	public int getCmtCount() {
		return cmtCount;
	}

	public void setCmtCount(int cmtCount) {
		this.cmtCount = cmtCount;
	}

//	@Override
//	public String toString() {
//		return "NoticeView [writerName=" + writerName + ", cmtCount=" + cmtCount + "]";
//	}
//	
	



	
	


	
}
