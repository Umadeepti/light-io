package com.dominionconsulting.tito.ui;

import org.junit.Before;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UIApplicationTest {
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}
}
