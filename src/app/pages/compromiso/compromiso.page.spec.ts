import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompromisoPage } from './compromiso.page';

describe('CompromisoPage', () => {
  let component: CompromisoPage;
  let fixture: ComponentFixture<CompromisoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompromisoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompromisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
