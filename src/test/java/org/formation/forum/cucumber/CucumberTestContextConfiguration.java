package org.formation.forum.cucumber;

import io.cucumber.spring.CucumberContextConfiguration;
import org.formation.forum.IntegrationTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@IntegrationTest
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
