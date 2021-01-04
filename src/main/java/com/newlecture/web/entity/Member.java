package com.newlecture.web.entity;

import java.util.Date;

public class Member {
	private int id;
	private String nicname;
	private String pwd;
	private String name;
	private String gender;
	private String birthday;
	private String phone;
	private String email;
	private Date regdate;
	
	
	public Member() {
		this(0,null,null,null,null,null,null,null,null);
	}

	public Member(int id, String nicname, String pwd, String name, String gender, String birthday, String phone,
			String email, Date regdate) {
		
		this.id = id;
		this.nicname = nicname;
		this.pwd = pwd;
		this.name = name;
		this.gender = gender;
		this.birthday = birthday;
		this.phone = phone;
		this.email = email;
		this.regdate = regdate;
	}


	public Member(int id, String nicname, String pwd, String email, Date regDate) {
		this.id = id;
		this.nicname = nicname;
		this.pwd = pwd;
		
		this.email = email;
		this.regdate = regDate;
	}

	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getNicname() {
		return nicname;
	}


	public void setNicname(String nicname) {
		this.nicname = nicname;
	}


	public String getPwd() {
		return pwd;
	}


	public void setPwd(String pwd) {
		this.pwd = pwd;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public String getBirthday() {
		return birthday;
	}


	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Date getRegdate() {
		return regdate;
	}


	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}


	@Override
	public String toString() {
		return "Member [id=" + id + ", nicname=" + nicname + ", pwd=" + pwd + ", name=" + name + ", gender=" + gender
				+ ", birthday=" + birthday + ", phone=" + phone + ", email=" + email + ", regdate=" + regdate + "]";
	}
	
	
}
