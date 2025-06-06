import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { supabase } from '../../supabase.client';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatToolbar, MatIconButton, MatIcon, NgOptimizedImage],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {
  @Output() menuClick = new EventEmitter<void>();
  avatarUrl: string = 'https://via.placeholder.com/40';

  async ngOnInit() {
    const { data: authData, error } = await supabase.auth.getUser();
    if (error || !authData.user) return;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('avatar_url')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (!userError && userData?.avatar_url) {
      this.avatarUrl = userData.avatar_url;
    }
  }

  onMenuClick() {
    this.menuClick.emit();
  }
}
