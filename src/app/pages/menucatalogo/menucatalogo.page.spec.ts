import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenucatalogoPage } from './menucatalogo.page';

describe('MenucatalogoPage', () => {
  let component: MenucatalogoPage;
  let fixture: ComponentFixture<MenucatalogoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenucatalogoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenucatalogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
